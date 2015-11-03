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

var NavBar = require('./helpers/NavBar');

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
  loginImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
  loginContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  name: {
    fontSize: 24,
    color: 'white',
    paddingBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'white',
    paddingBottom: 20,
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
      <View 
        style={basicStyles.blank}>
        <NavBar 
          title={'My Account'}
          leftIcon={'material|close'} 
          onPressLeft={()=>this.props.navigator.pop()}/>
        <Image
          source={{uri: user.get('tempUrl')}}
          style={styles.loginImage}>
          <View style={styles.loginContainer}>
            <Text style={styles.name}>{user.get('name')}</Text>
            <Text style={styles.email}>{user.get('email')}</Text>
            <FBSDKLoginButton
              style={styles.loginButton}
              onLogoutFinished={() => {
                Parse.User.logOut();
                this.props.navigator.replace({
                  id: 'Login',
                });
              }}
            />
          </View>
        </Image>
      </View>
    );
  }
};

module.exports = MyAccount;