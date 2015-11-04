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
  TouchableOpacity,
  Text,
  NavigatorIOS,
  Platform,
} = React;

var AddButton = require('./helpers/AddButton');
var Modal = require('./helpers/Modal');
var Separator = require('./helpers/Separator');
var Swipeout = require('./helpers/Swipeout');
var TodoItem = require('./TodoItem');
var TodoAdd = require('./TodoAdd');

var Utils = require('./helpers/Utils'); 

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
});

class TodoList extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  }
  observe(props, state) {
    var queryGroupTodoDone = (new Parse.Query('Todo')).notEqualTo('individual', true).equalTo('group', this.props.group.objectId).containsAll('whoAreDone', this.props.group.members); 
    var queryGroupTodo =  (new Parse.Query('Todo')).notEqualTo('individual', true).equalTo('group', this.props.group.objectId).doesNotMatchKeyInQuery('objectId', 'objectId', queryGroupTodoDone); 
    var queryPersonTodo = (new Parse.Query('Todo')).equalTo('individual', true).equalTo('group', this.props.group.objectId).equalTo('createdBy', Platform.OS === 'ios' ? Parse.User.current().id : "jIZUlILeeI").equalTo('done', false);
    return {
      todos: Parse.Query.or(queryGroupTodo, queryPersonTodo)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: this.ds.cloneWithRows(this.data.todos)});
  }
  
  onPressNewTodo() {
    if (Platform.OS === 'android') {
      Utils.alert('Stay Tuned; Android support is coming! :)');
      return;
    }
    //console.log("group ID pass to TODO : " + this.props.group.objectId);
    this.props.navigator.push({
      id: 'TodoAdd',
      group: this.props.group.objectId,
    });
  }

  renderRow(rowData) {
    var deleteBtn = {
      text: 'Delete', 
      backgroundColor: '#ff0000',
      onPress: function(){
        var target = {
          className: 'Todo',
          objectId: rowData.objectId,
        };
        ParseReact.Mutation.Destroy(target).dispatch();
      }
    }; 
    var checkFinishBtn = {
      text: 'Done', 
      backgroundColor:'#32cd32',
      onPress: function(){
        var target = {
          className: 'Todo',
          objectId: rowData.objectId,
        };
        var uid = Platform.OS === 'ios' ? Parse.User.current().id : "jIZUlILeeI"; 
        var index = rowData.whoAreDone.indexOf(uid);
        if(index <0){
          rowData.whoAreDone.push(uid); 
          ParseReact.Mutation.Set(target, { whoAreDone: rowData.whoAreDone}).dispatch();
        }
        //If the todo is individual, set done to true
        if(rowData.individual === true) {
          ParseReact.Mutation.Set(target, {done: true}).dispatch();
        }
      }
    }; 
    var swipeBtn = [checkFinishBtn, deleteBtn];
    return (
      <Swipeout backgroundColor={'#fff'} autoClose={true} right={swipeBtn}>
        <View>
          <TodoItem todo={rowData}/>
        </View>
      </Swipeout>
    );
  }
  renderSeparator() {
    return (
      <Separator/>
    );
  }
  render(){
    return (
      <View style={basicStyles.flex1}>
        <ListView
          dataSource={this.ds.cloneWithRows(this.data.todos)}
          renderRow={this.renderRow.bind(this)} 
          renderSeparator={this.renderSeparator.bind(this)}/>       
        <AddButton onPress={() => this.onPressNewTodo()}/>
      </View>
    );
  }
};

module.exports = TodoList;