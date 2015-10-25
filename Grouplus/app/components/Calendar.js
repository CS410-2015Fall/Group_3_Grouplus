
'use strict';

var React = require('react-native');

var {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHightlighy,
} = React;

var {
  CalendarManager
} = require('NativeModules');

var date = new Date("October 14, 2015");

CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey', date.toISOString());

var Calendar = React.createClass({
  render: function() {
    console.log(date);
    return(
    <View style={styles.container}>
         <Text style={styles.welcome}>
         {date.toISOString()}
         </Text>
     </View>
    );
  }
});


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
  content: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Calendar;