/**
 * Display events and UI for adding new ones.
 */
var React = require('react-native');
var Calendar = require('./Calendar');
var EventList = require('./EventList');

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
        <Text style={styles.stub}>{this.props.events + 'Hi'}</Text>
        <EventList events={this.props.events}/>      	
      </View>
    );
  }
};
Events.propTypes = {
  events: React.PropTypes.array.isRequired,
}

module.exports = Events;