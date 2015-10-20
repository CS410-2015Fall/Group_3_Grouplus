var React = require('react-native');
var FBSDKCore = require('react-native-fbsdkcore');

var {
  FBSDKAccessToken,
  FBSDKGraphRequest,
} = FBSDKCore;

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Image,
} = React;

var GroupList = require('./GroupList');
var MyAccount = require('./MyAccount');

var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

var Parse = require('parse/react-native');
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var styles = StyleSheet.create({
  loginImage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  loginButton: {
    width: 200,
    height: 50,
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
  },
  spacer: {
    flex: 3,
    backgroundColor: 'transparent',
  },
});

class LoginScreen extends React.Component{
  render() {
    return (
      <Image
        source={{uri: 'launch_screenshot'}}
        style={styles.loginImage}>
        <View style={styles.spacer} />
        <FBSDKLoginButton
          style={styles.loginButton}
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                FBSDKAccessToken.getCurrentAccessToken((token) => {
                  console.log(token.tokenString);
                  var profileRequest = new FBSDKGraphRequest((error, result) => {
  if (error) {
    alert('Error making request.');
  } else {
    console.log(result);
                  
  }
}, '/me');
                })
                this.props.navigator.push({
                  title: 'MyAccount',
                  //component: GroupList,
                  component: GroupList,
                });
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={[]}/>
        <View style={styles.spacer} />
      </Image>
    );
  }
}

module.exports = LoginScreen;