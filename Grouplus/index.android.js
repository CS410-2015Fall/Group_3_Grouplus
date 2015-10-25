/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

/**
 * This is completely broken right now TODO fix
 */
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var LoginScreen = require('./app/components/LoginScreen');

var Grouplus = React.createClass({
  render: function() {
    return (
        <LoginScreen />
    );
  }
});

AppRegistry.registerComponent('Grouplus', () => Grouplus);
