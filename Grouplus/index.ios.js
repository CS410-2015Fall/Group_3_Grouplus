
'use strict';

var React = require('react-native');
var FBSDKCore = require('react-native-fbsdkcore');
var LoginScreen = require('./app/components/LoginScreen');
var GroupList = require('./app/components/GroupList');

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');


Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var {
  FBSDKAccessToken,
} = FBSDKCore;

// Make react global
window.React = React;

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
} = React;

var{
  FBSDKAccessTocken,
} = FBSDKCore;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});


var Grouplus = React.createClass({

  getInitialState: function() {
      return {userLoggedIn: false}
  },

  componentWillMount: function() {
    FBSDKAccessToken.getCurrentAccessToken(                  
                  (token) => {
                    this.setState({userLoggedIn: true});
                    var authData = {
                      id: token.userID,
                      access_token: token.tokenString,
                      expiration_date: token.expirationDate()
                    };
                    console.log("authData" + token.userID);
                    Parse.FacebookUtils.logIn(authData, {
                      success: (user) => {
                        if (user.existed()) {
                          console.log("user EXISTED");
                          this.setState({isLoadingCurrentUser: false});
                        } 
                                    }});
  });
  },

  render: function() {
    //asynchronous call to setState, need to check isMounted
    if(this.isMounted()) {
if(this.state.userLoggedIn === true) {
            return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Grouplus',
          component : GroupList,
        }}/>
    );
    }
      return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Grouplus',
          component : GroupList,
        }}/>
    );
    }
    else
      return <View />

  }

    
});


AppRegistry.registerComponent('Grouplus', () => Grouplus);
