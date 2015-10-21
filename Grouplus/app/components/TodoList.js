/**
 * Display a list of todo items
 *
 * TODOs: make it swipable 
 */

var React = require('react-native');
var Separator = require('./helpers/Separator');
var TodoItem = require('./TodoItem');

var {
  View,
  ListView,
  StyleSheet,
} = React;

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
  _renderRow(rowData) {
    return (
      <View>
        <TodoItem todo={rowData}/>
        <Separator/>
      </View>
    );
  }
  render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)} 
      />
    );
  }
};

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
}

module.exports = TodoList;