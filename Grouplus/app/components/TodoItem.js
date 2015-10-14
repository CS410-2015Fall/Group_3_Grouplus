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
  info: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dueDate: {
    fontSize: 14,
    color: 'red',
  },
});

class TodoItem extends React.Component{
  render(){
    var todo = this.props.todo;
    var dueDate = todo.dueDate ? moment(todo.dueDate).format('MMM D') : '';
    return (
      <View style={styles.container}>
        <Text style={styles.title}> {todo.title} </Text>
        <View style={styles.info}>
          <Text style={styles.dueDate}> {dueDate} </Text>
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