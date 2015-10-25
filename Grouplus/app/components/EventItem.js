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
  AlertIOS,
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
          <Text style={styles.buttonText}>Export</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

EventItem.propTypes = {
  event: React.PropTypes.object.isRequired,
}

module.exports = EventItem;