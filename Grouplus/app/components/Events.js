/**
 * Display events and UI for adding new ones.
 */
var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
} = React;

var styles = StyleSheet.create({  
  container: {
    flex: 1,
    alignItems: 'center'
  },
  stub: {
    margin:50,
    fontSize: 45
  }
});

class Events extends React.Component{
  render(){
    return (
      <View style={styles.container}>
      	<Text style={styles.stub}>TODO: UI for Events</Text>
      </View>
    );
  }
};

module.exports = Events;