
'use strict';

var React = require('react-native');

//var CalendarManager = require('react-native').NativeModules.CalendarManager;
var {
  CalendarManager
} = require('NativeModules');

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
      <View style={styles.container}>
        <Text style={styles.welcome}>
        Grouplus!!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
      <Image
        style={styles.loginImage}>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>Images taken from New Horizons Facebook page</Text>
        </View>
        <Login style={styles.loginContainer}/>
      </Image>
    );
  },
});

CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
var styles = StyleSheet.create(require('./styles.js'));


AppRegistry.registerComponent('Grouplus', () => Grouplus);
