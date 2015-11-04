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
    flex: 20,
    flexDirection: 'row',
    height: 70,
    margin: 3,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    flex: 7,
    textAlign: 'left',
  },
  info: {
    flex: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
  },
  time: {
    fontSize: 14,
    color: 'red',
  },
  loc: {
    fontSize: 14,
    color: 'orange',
  }
});

class EventItem extends React.Component{
  render(){
    var event = this.props.event;
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}> {event.name} </Text>
          <Text style={styles.time}> {moment(event.dueDate).calendar()} </Text>
          <Text style={styles.loc}> {event.location} </Text>
        </View>
      </View>
    );
  }
};

EventItem.propTypes = {
  event: React.PropTypes.object.isRequired,
}

module.exports = EventItem;