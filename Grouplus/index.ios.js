/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Login = require('./Login');

var Grouplus = React.createClass({
  render: function() {
    return (
     
        <Login style={styles.loginContainer}/>

    );
  }
});

var styles = StyleSheet.create(require('./styles.js'));

AppRegistry.registerComponent('Grouplus', () => Grouplus);
