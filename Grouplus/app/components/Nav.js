/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Platform,
} = React;

var Login = require('./Login');
var Grouplus = require('./Grouplus');
var GroupList = require('./GroupList');
var GroupAdd = require('./GroupAdd');
var EventAdd = require('./EventAdd');
var TodoAdd = require('./TodoAdd');
var GroupPanel = require('./GroupPanel');
var GroupAddMember = require('./GroupAddMember');
var MyAccount = require('./MyAccount');

if (Platform.OS === 'ios') {
  var FBSDKCore = require('react-native-fbsdkcore');
  var {
    FBSDKAccessToken,
  } = FBSDKCore;
}

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
  textScreen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#FF9966',
  },
  textScreenText: {
    fontSize: 20,
    color: 'white',
    opacity: 50,
    padding: 10,
  },  
  navBar: {
    height: 64,
    backgroundColor: '#3399FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: 'white', 
    margin: 10, 
    fontSize: 22,
  },
});



class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 'loading',
    };
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      return;
    }
    Parse.User.currentAsync().then((user) => {
      if (user === null) {
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
                this.setState({login: 'loggedIn'})
              },
               error: (error) => {
                console.error("Error login" + error);
                this.setState({login: 'error'});
              }
            });
          } else {
            this.setState({login: 'needLogin'});
          }
        }); 
      } else {
        this.setState({login: 'loggedIn'});
      }
    });
  }
  render() {
    var initialRoute = {};
    var that = this;
    console.log('RENDER');
    if (Platform.OS === 'android') {
      initialRoute = {id: 'Grouplus'}
    } else if (this.state.login === 'loading') {
      return this.plainTextScreen('Loading...');
    } else if (this.state.login === 'loggedIn') {
      initialRoute = {id: 'GroupList', user: Parse.User.current()};
    } else if (this.state.login === 'needLogin') {
      initialRoute = {id: 'Login'}
    } else if (this.state.login === 'error') {
      return this.plainTextScreen('Fatal error logging in :(')
    }
    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }
        } />
    );
  }
  renderScene(route, navigator) {
    var id = route.id;
    if (id === 'Login') {
      return (
        <Login navigator={navigator} />
      );
    }
    if (id === 'Grouplus') { //Android main screen
      return (
        <Grouplus navigator={navigator} user={route.user}/>
      );
    }
    if (id === 'GroupList') { //iOS main screen
      return (
        <GroupList navigator={navigator} user={route.user}/>
      );
    }
    if (id === 'GroupPanel') {
      return (
        <View style={basicStyles.flex1}>
          <View style={styles.navBar}>
            <View style={{height: 20}}/> 
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.navTitle}>{route.group.name}</Text>
            </TouchableOpacity>
          </View>
          <GroupPanel group={route.group} navigator={navigator}/>
        </View>
      );
    }
    if (id === 'GroupAdd') {
      return (
        <GroupAdd navigator={navigator}/>
      );
    }
    if (id === 'TodoAdd') {
      return (
        <TodoAdd navigator={navigator} group={route.group}/>
      );
    }
    if (id === 'EventAdd') {
      return (
        <EventAdd navigator={navigator}/>
      );
    }
    if (id === 'GroupAddMember') {
      return (
        <View></View>
      );
    }
    if (id === 'MyAccount') {
      return (
        <MyAccount navigator={navigator}/>
      );
    } 
    else {
      return this.plainTextScreen('Opps! You found a bug :(');
    }
  }
  plainTextScreen(text) {
    return (
      <View style={styles.textScreen}>
        <Text style={styles.textScreenText}>{text}</Text>
      </View>
    );
  }
}

module.exports = Nav;