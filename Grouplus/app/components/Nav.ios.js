/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Platform,
} = React;

var Login = require('./Login');
var GroupList = require('./GroupList');

var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKAccessToken,
} = FBSDKCore;

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
});

class Nav extends ParseComponent {
  render() {
    return (
      <Navigator
        initialRoute={{id: 'SplashPage', name: 'Index'}}
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
    var routeId = route.id;
    if (routeId === 'Login') {
      return (
        <Login navigator={navigator} />
      );
    }
    else {
      return this.noRoute(navigator);
    }
  }
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <Text>Opps! You found a bug :(</Text>
      </View>
    );
  }
}