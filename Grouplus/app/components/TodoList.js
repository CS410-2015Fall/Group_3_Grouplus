/**
 * Display a list of todo items
 *
 * TODOs: make it swipable 
 */

var React = require('react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
var Parse = require('parse/react-native');
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var {
  View,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  NavigatorIOS,
} = React;

var Modal = require('./helpers/Modal');
var Separator = require('./helpers/Separator');
var TodoItem = require('./TodoItem');
var TodoAdd = require('./TodoAdd');

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
});

class TodoList extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    
    /*this.state = {
      dataSource: this.ds.cloneWithRows(this.props.todos),
    };*/
  }
  observe(props, state) {
    return {
      todos: (new Parse.Query('Todo')).equalTo('group', this.props.group.objectId),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: this.ds.cloneWithRows(/*nextProps.todos*/ this.data.todos)});
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
          dataSource={this.ds.cloneWithRows(this.data.todos)}
          renderRow={this.renderRow.bind(this)} 
          renderFooter={this.renderFooter.bind(this)}
          contentInset={{top:64, bottom: 50}}
          automaticallyAdjustContentInsets={false}
        />
        <Modal ref={'addTodo'} component={TodoAdd} />
      </View>
    );
  }
};

/*
TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
}*/

module.exports = TodoList;