/**
 * Display a list of todo items
 *
 * TODOs: make it swipable 
 */

var React = require('react-native');
var Separator = require('./helpers/Separator');
var TodoItem = require('./TodoItem');
var TodoTemplate = require('./TodoTemplate');

var {
  View,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  NavigatorIOS,
} = React;

var styles = StyleSheet.create({
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#3399FF',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
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
    this.props.navigator.push({
      title: 'Add New Todo',
      component: TodoTemplate,
    });
    
  }

  _renderRow(rowData) {
    return (
      <View>
        <TodoItem todo={rowData}/>
        <Separator/>
      </View>
    );
  }


  _renderFooter() {
      console.log("group : " + this.props.group);
    return (
      <TouchableHighlight style={styles.button}  navigator={this.props.navigator}
          group={this.props.group} onPress={() => this.onPressNewTodo()}>
        <Text style={styles.buttonText}>Add New Todo </Text>
      </TouchableHighlight>
      );
  }

  render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)} 
        renderFooter={this._renderFooter.bind(this)}
      />
    );
  }
};

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
}

module.exports = TodoList;