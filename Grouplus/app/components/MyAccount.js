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

var { Icon,
} = require('react-native-icons');

var {
  View,
  Image,
  StyleSheet,
  ListView,
  Text,
  NavigatorIOS,
  TouchableHighlight,
} = React;

var NavBar = require('./helpers/NavBar');
var MyAccountEdit = require('./MyAccountEdit');
var GroupAdd = require('./GroupAdd');
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
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  edit: {
    width: 30,
    height: 30,
  },
});

class MyAccount extends React.Component{
  constructor(props){
    super(props);
   //TODO: Error with current FBSDKGraphRequest 
//   var profileRequest = new FBSDKGraphRequest((error, result) => {
//   if (error) {
//     alert('Error making request.');
//   } else {
//     // Data from request is in result
//   }
// }, '/me');
// // Start the graph request.
// profileRequest.start(12000);
  }

  onPressEditName(){
    //TODO: Is it supported by Android?
      this.props.navigator.push({
      id: 'MyAccountEdit',
    });
  }

  render(){
    var user = Parse.User.current(); 
    console.log("NAME: " + user.get('name') + user.get('email'));
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
            <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.get('name')} </Text>
            <TouchableHighlight onPress={this.onPressEditName.bind(this)}>
            <Icon
              name='ion|edit'
              size={20}
              color='white'
              style={styles.edit}
              />
              </TouchableHighlight>
              </View>
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