/**
 * Display a list of todo items
 *
 * TODOs: make it swipable 
 */

var React = require('react-native');

var {
  View,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  NavigatorIOS,
} = React;

var Modal = require('react-native-modalbox');

var Separator = require('./helpers/Separator');
var TodoItem = require('./TodoItem');
var TodoAdd = require('./TodoAdd');

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
});

class TodoList extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.todos),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: this.ds.cloneWithRows(nextProps.todos)});
  }
  
  onPressNewTodo() {
    this.refs.addTodo.open();
  }

  renderRow(rowData) {
    return (
      <View>
        <TodoItem todo={rowData}/>
        <Separator/>
      </View>
    );
  }

  renderFooter() {
      console.log("group : " + this.props.group);
    return (
      <TouchableHighlight style={basicStyles.button}  navigator={this.props.navigator}
          group={this.props.group} onPress={() => this.onPressNewTodo()}>
        <Text style={basicStyles.buttonText}>Add New Todo</Text>
      </TouchableHighlight>
      );
  }

  render(){
    return (
      <View style={basicStyles.flex1}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} 
          renderFooter={this.renderFooter.bind(this)}
        />
        <Modal ref={'addTodo'}>
          <TodoAdd/>
        </Modal>
      </View>
    );
  }
};

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
}

module.exports = TodoList;