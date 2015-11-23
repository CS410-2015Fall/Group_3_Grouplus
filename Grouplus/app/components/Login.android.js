var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var moment = require('moment');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ToastAndroid,
} = React;

var GroupList = require('./GroupList');
var FBLogin = require('react-native-facebook-login');

// initializing Parse
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var styles = StyleSheet.create({
  loginImage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
    paddingBottom: 30,
  },
  loginContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
});

// TODO: refactor and clean up
class Login extends React.Component {
  constructor() {
    super();
  }
  onLogin(data) {
    var profile = data.profile;
    var authData = {
      id: profile.id,
      access_token: data.token,
      expiration_date: new Date(data.expiration).toISOString()
    };
    console.log(data);
    console.log(authData);
    Parse.FacebookUtils.logIn(authData, {
      success: (user) => {
        if (!user.existed()) {
          ParseReact.Mutation.Set(
            {
              className: '_User',
              objectId: profile.id
            }, 
            {
              //setting username, email, name and facebook Id
              username: profile.email,
              email: profile.email,
              name: profile.name,
              facebookId: profile.id,
              pic: profile.picture.data.url,
            }).dispatch({
              waitForServer: true
            });
        }
        this.props.navigator.replace({
          id: 'Grouplus',
          user: Parse.User.current(),
        });
      },
      error: (user, error) => {
        console.log(user);
        console.log(error);
        console.log('fail');
        ToastAndroid.show('Opps, login to Grouplus failed :( Try again later.', 
          ToastAndroid.SHORT);
      }
    });
  }
  render(){
    return (
      <View>
        <ScrollView>
          <Text>in android login screen</Text>
        </ScrollView>
        <FBLogin
          onLogin={this.onLogin.bind(this)}
          onLoginFound={this.onLogin.bind(this)}
          onError={() => ToastAndroid.show('Error logging in :(', ToastAndroid.SHORT)}
          onCancel={() => ToastAndroid.show('Login cancelled', ToastAndroid.SHORT)}/>
      </View>
    );
  }
}

module.exports = Login;