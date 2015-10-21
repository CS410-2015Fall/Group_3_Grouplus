
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

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var Grouplus = React.createClass({

  checkLogin: function() {
      FBSDKAccessToken.getCurrentAccessToken(                  
                  (token) => {
                    if(token){
                    //console.log("User already logged in with token: " + token.tokenString);
                    this.setState({isLoadingCurrentUser: false});
                    return true;
                    }
                    else
                      return false;
                  });
  },

  render: function() {
      return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Grouplus',
          component : LoginScreen,
        }}/>
    );
  },
});


AppRegistry.registerComponent('Grouplus', () => Grouplus);
