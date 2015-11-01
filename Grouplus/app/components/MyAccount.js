/**
 * Display a list of people using using their avatar images
 * Used for showing people who have completed a todo
 */

var React = require('react-native');
var Login = require('./Login');
var Index = require('./../../index.ios.js');
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
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatar: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  first: {
    fontSize: 10,
    color: 'orange',
  },
  group: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
  },
  groupDetail: {
    marginVertical: 10,
  },
  groupName: {
    fontSize: 24,
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
  spacer: {
    flex: 3,
    backgroundColor: 'transparent',
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
        <View>
          <View style={styles.group}>
            <View style={styles.groupDetail}>
              <Text style={styles.groupName}> Name : {user.get("name")} </Text>
              <Text style={styles.groupName}> Email : {user.get("email")} </Text>
            </View>
          </View>
          <FBSDKLoginButton
          style={styles.loginButton}
          onLogoutFinished={() => {
            Parse.User.logOut();
    //         this.props.navigator.popToRoute({
    // component: require('./c'),
    // sceneConfig: Navigator.SceneConfigs.FloatFromRight,
    //     });
            this.props.navigator.replace({
                   title: 'Login',
                   component: Index,
                 });
            alert('Logged out.');
          }
            
        }
          />
      </View>
    );
  }
};

MyAccount.propTypes = {
  myaccount: React.PropTypes.array.isRequired,
}

module.exports = MyAccount;