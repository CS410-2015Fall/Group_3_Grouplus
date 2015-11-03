var React = require('react-native');
var FBSDKCore = require('react-native-fbsdkcore');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var {
  FBSDKAccessToken,
  FBSDKGraphRequest,
  FBSDKGraphRequestManager,
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
var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

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
var Login = React.createClass({

  onFacebookLogin: function(token) {
    console.log("reached onFacebookLogin");
    if (!token)
      return;

     var authData = {
      id: token.userID,
      access_token: token.tokenString,
      expiration_date: token.expirationDate()
    };
    console.log("authData " + token.userID);
    Parse.FacebookUtils.logIn(authData, {
      success: (user) => {
        if (user.existed()) {
          console.log("Logging in... user exists with id : " + user.id);
          // login: nothing to do
          this.setState({isLoadingCurrentUser: false});
        } else {
          // signup: update user data, e.g. email
          var data = user.get('authData').facebook;
          console.log("[data]: ", data);
          var api = 'https://graph.facebook.com/v2.4/'+data.id+'?fields=name,email&access_token='+data.access_token;

          var fetchProfile = new FBSDKGraphRequest((error, result) => {
            if (error) {
              // TODO: check error message format and adjust to correct flow.
              this.setState({isLoadingCurrentUser: false, error: error});
            } else {
              console.log("[email]: ", result.email);
              console.log("[name]: ", result.name);
              var name = result.name;
              var email = result.email;
              var facebookId= token.userID;
              ParseReact.Mutation.Set({
                className: '_User',
                objectId: user.id
              }, {
                //setting username, email, name and facebook Id
                username: email,
                email: email,
                name: name,
                facebookId: facebookId,

              }).dispatch({waitForServer: true});
              this.setState({isLoadingCurrentUser: false});
            }
          }, '/me?fields=name,email,id,picture');

          // FIXME https://github.com/facebook/react-native-fbsdk/issues/20
          // fetchProfile.start();
          // TODO: add loading.... button?
          FBSDKGraphRequestManager.batchRequests([fetchProfile], function() {}, 10)
        }
        this.props.navigator.replace({
          id: 'GroupList',
          user: Parse.User.current(),
        });
      },
      error: (user, error) => {
        switch (error.code) {
          case Parse.Error.INVALID_SESSION_TOKEN:
            Parse.User.logOut().then(() => {
              this.onFacebookLogin(token);
            });
            break;
          default:
            // TODO: error
        }
        this.setState({isLoadingCurrentUser: false});
      }
    });
  },

 
 render: function(){
    return (
      <Image
        source={{uri: 'launch_screenshot'}}
        style={styles.loginImage}>
        <View style={styles.loginContainer}>
          <FBSDKLoginButton
            style={styles.loginButton}
            onLoginFinished={(error, result) => {
              if (error) {
                alert('Error logging in.');
              } else {
                if (result.isCancelled) {
                  alert('Login cancelled.');
                } else {
                  FBSDKAccessToken.getCurrentAccessToken(                  
                    (token) => {
                      console.log("token: " + token.tokenString);
                      this.onFacebookLogin(token)
                    }
                  );
                }
              }
            }}
            onLogoutFinished={() => alert('Logged out.')}
            readPermissions={['email']}
            publishPermissions={[]}/>
        </View>
      </Image>
    );
}
  });

module.exports = Login;