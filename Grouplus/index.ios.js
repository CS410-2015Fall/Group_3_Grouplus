
'use strict';

var React = require('react-native');
// Make react global
window.React = React;

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var Login = require('./Login');

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
var Grouplus = React.createClass({
  render: function() {
    return (
      <Image
        //source={{uri: 'plutoBack.png'}}
        style={styles.loginImage}>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>Images taken from New Horizons Facebook page</Text>
        </View>
        <Login style={styles.loginContainer}/>
      </Image>
    );
  }
});

var styles = StyleSheet.create(require('./styles.js'));

AppRegistry.registerComponent('Grouplus', () => Grouplus);
