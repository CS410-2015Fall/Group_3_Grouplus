
'use strict';

var React = require('react-native');
var LoginScreen = require('./app/components/login/LoginScreen');
// Make react global
window.React = React;

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Image,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var Grouplus = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Grouplus',
          component: LoginScreen, 
        }}
      />
    );
  }
});

AppRegistry.registerComponent('Grouplus', () => Grouplus);
