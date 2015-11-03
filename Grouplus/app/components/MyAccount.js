/**
 * Display a list of people using using their avatar images
 * Used for showing people who have completed a todo
 */

var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKGraphRequest,
  FBSDKGraphRequestManager,
} = FBSDKCore;
var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

var {
  View,
  Image,
  StyleSheet,
  ListView,
  Text,
  NavigatorIOS,
} = React;

var styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});

class MyAccount extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  }
  render(){
    var user = Parse.User.current(); 
    return (
        <View style={styles.mainView}>
          <FBSDKLoginButton
            style={styles.loginButton}
            onLogoutFinished={() => {
              Parse.User.logOut();
              this.props.navigator.replace({
                     id: 'Login',
                   });
              alert('Logged out.');
            }}
          />
      </View>
    );
  }
};

module.exports = MyAccount;