/**
 * Display a single todo item with title and duedate
 * showing avatars of people who completed the tasks
 */

var React = require('react-native');
var moment = require('moment');
var People = require('./People');

var {
  Text,
  View,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
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
  titleHigh: {
    fontSize: 22,
    flex: 7,
    textAlign: 'left',
    color: 'red',
  },
  titleMedium: {
    fontSize: 22,
    flex: 7,
    textAlign: 'left',
    color: 'orange',
  },
  info: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dueDate: {
    fontSize: 14,
    color: 'black',
  },
  dueDatePast: {
    fontSize: 14,
    color: 'red',
  },
  individual: {
    fontSize: 10,
    color: 'grey',
  },
});

class TodoItem extends React.Component{
  render(){
    var todo = this.props.todo;
    var dueDate = todo.dueDate ? moment(todo.dueDate).format('MMM D') : '';
    var individual = todo.individual ? 'individual ' : '';
    var todoStyle = styles.title;
    if(todo.priority === "1"){
      todoStyle = styles.titleHigh;
    }
    if(todo.priority === "2"){
      todoStyle = styles.titleMedium;
    }
    var dueDateStyle = styles.dueDate;
    if(todo.dueDate < new Date()) {
      dueDateStyle = styles.dueDatePast;
    }
    return (
      <View style={styles.container}>
        <Text style={todoStyle}> {todo.name} </Text>
        <View style={styles.info}>
          <Text style={styles.individual}> {individual} </Text>
          <Text style={dueDateStyle}> {dueDate} </Text>
          <People people={todo.whoAreDone} />
        </View>
      </View>
    );
  }
};

TodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
}

module.exports = TodoItem;