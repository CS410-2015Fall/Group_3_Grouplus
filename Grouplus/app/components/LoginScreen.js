var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Image,
} = React;

var GroupList = require('./GroupList');

var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

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
              if (result.isCanceled) {
                alert('Login cancelled.');
              } else {
                this.props.navigator.push({
                  title: 'Groups',
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