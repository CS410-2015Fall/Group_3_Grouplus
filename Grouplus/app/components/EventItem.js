/**
 * Display a single todo item with title and duedate
 * showing avatars of people who completed the tasks
 */

var React = require('react-native');
var moment = require('moment');

var {
  CalendarManager
} = require('NativeModules');

var {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    margin: 3,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    flex: 7,
    textAlign: 'left',
  },
  info: {
    flex: 15,
    flexDirection: 'column',

    justifyContent: 'flex-start',
  },
  button:{
    flex: 2,

  },
  text: {
    fontSize: 14,
    color: 'black',
    textAlign: 'left',

  },
});

class EventItem extends React.Component{
  render(){
    var event = this.props.event;
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}> {event.title} </Text>
          <Text style={styles.text}> {event.date} </Text>
          <Text style={styles.text}> {event.location} </Text>
        </View>
        <TouchableHighlight 
        style={styles.button}
        onPress={()=>
          CalendarManager.addEvent(event.title, event.location, event.date)
          }>
          <Text>Export</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

EventItem.propTypes = {
  event: React.PropTypes.object.isRequired,
}

module.exports = EventItem;