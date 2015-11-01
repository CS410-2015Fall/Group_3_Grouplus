
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
} = React;

var Nav = require('./app/components/Nav');
var Login = require('./app/components/Login');
var GroupList = require('./app/components/GroupList');

var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKAccessToken,
} = FBSDKCore;

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var basicStyles = require('./app/components/helpers/Styles');
var styles = StyleSheet.create({
});

class Grouplus extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: true,
    }
  }
  componentWillMount() {
    FBSDKAccessToken.getCurrentAccessToken((token)=> {
      if (token) {
        var authData = {
          id: token.userID,
          access_token: token.tokenString,
          expiration_date: token.expirationDate()
        };
        Parse.FacebookUtils.logIn(authData, {
          success: (user) => {
            console.log("Logging in with: " + token.userId);
            this.setState({loading: false, loggedIn: true})
          },
           error: (error) => {
            console.error("Error login" + error);
            this.setState({loading: false, loggedIn: false});
          }

        });
      } else {
        this.setState({loading: false, loggedIn: false});
      }
    }); 
  }
  render() {
    if (this.state.loading) {
      return <Text>loading...</Text>;
    } else if(this.state.loggedIn) {
      return (
        <NavigatorIOS
          style={basicStyles.flex1}
          initialRoute={{
            title: 'Grouplus',
            component : GroupList,
            passProps: {
              user: Parse.User.current()
            }
          }}
        />
      );
    } else {
      return (
        <NavigatorIOS
        style={basicStyles.flex1}
        initialRoute={{
          title: 'Grouplus',
          component : LoginScreen,
        }}/>
      );
    }
  }
}


AppRegistry.registerComponent('Grouplus', () => Grouplus);
