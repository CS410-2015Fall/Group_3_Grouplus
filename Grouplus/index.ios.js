/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
// Make react global
window.React = React;

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View,
} = React;

var Login = require('./Login');
var LoginMock = require('./LoginMock');

var Grouplus = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        itemWrapperStyle={styles.allPages}
        initialRoute={{
          title: 'Login',
          component: Login,
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  allPages: {
    backgroundColor: '#EEE',
  },
});


AppRegistry.registerComponent('Grouplus', () => Grouplus);
