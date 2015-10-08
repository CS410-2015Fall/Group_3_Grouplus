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
      <Image
        style={styles.loginImage}>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>Grouplus</Text>
        </View>
        <Login style={styles.loginContainer}/>
      </Image>
    );
  }
});

var styles = StyleSheet.create(require('./styles.js'));

AppRegistry.registerComponent('Grouplus', () => Grouplus);
