
'use strict';

var React = require('react-native');
//var CalendarManager = require('react-native').NativeModules.CalendarManager;

// Make react global
//window.React = React;
var Calendar = require('./Calendar');
var Login = require('./Login');


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
} = React;


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
          component: Calendar, 
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Grouplus', () => Grouplus);
