/**
 * Display events and UI for adding new ones.
 */
var React = require('react-native');
var EventList = require('./EventList');

var {
  StyleSheet,
  View,
  Text,
} = React;

var styles = StyleSheet.create({  
  container: {
    flex: 1,
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
        //<EventList events={this.props.events} navigator={this.props.navigator}/>      	
      </View>
    );
  }
};

Events.propTypes = {
  events: React.PropTypes.array.isRequired,
}

module.exports = Events;