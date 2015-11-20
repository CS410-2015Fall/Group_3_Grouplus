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
  SwitchIOS,
} = React;

var AddButton = require('./helpers/AddButton');
var Separator = require('./helpers/Separator');
var Swipeout = require('./helpers/Swipeout');
var TodoItem = require('./TodoItem');
var TodoAdd = require('./TodoAdd');

var Utils = require('./helpers/Utils'); 

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    width: 22,
    color: 'white',
  },
});

var { Icon } = require('react-native-icons');
//var ActionButton = require('react-native-action-button');

class TodoList extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      doneSwitchIsOn: false
    }
  }

  observe(props, state) {
    var queryGroupTodo =  (new Parse.Query('Todo')).ascending('dueDate').notEqualTo('individual', true).equalTo('group', this.props.group.objectId).equalTo('done', false);//doesNotMatchKeyInQuery('objectId', 'objectId', queryGroupTodoDone); 
    var queryPersonTodo = (new Parse.Query('Todo')).ascending('dueDate').equalTo('individual', true).equalTo('group', this.props.group.objectId).equalTo('createdBy', Platform.OS === 'ios' ? Parse.User.current().id : "jIZUlILeeI").equalTo('done', false);
    return {
      todos: Parse.Query.or(queryGroupTodo, queryPersonTodo).ascending('priority', 'dueDate'),
      todosDone: new Parse.Query('Todo').descending('dueDate').equalTo('group', this.props.group.objectId).equalTo('done', true),
    }
  }

  onPressNewTodo() {
    if (Platform.OS === 'android') {
      Utils.alertToast('Stay Tuned; Android support is coming! :)');
      return;
    }
    this.props.navigator.push({
      id: 'TodoAdd',
      group: this.props.group.objectId,
      refresh: this.refreshQueries.bind(this),
      status: 'add',
    });
  }

  onPressViewDone(value) {
    if (Platform.OS === 'android') {
      Utils.alertToast('Stay Tuned; Android support is coming! :)');
      return;
    }
    this.setState({doneSwitchIsOn: value});
    console.log("DONE SWITCH : " + value);
    
  }

  renderRow(rowData) {
    var that = this;
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
    var editBtn = {
      text: 'Edit', 
      backgroundColor:'#ffd805',
      onPress: function(){
        that.props.navigator.push({
        id: 'TodoAdd',
        group: that.props.group.objectId,
        todo: rowData,
        refresh: that.refreshQueries.bind(that),
        status: 'edit',
    });
        
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

        //If the todo is individual, set done to true
        if(rowData.individual === true) {
          rowData.whoAreDone.push(uid); 
          ParseReact.Mutation.Set(target, { whoAreDone: rowData.whoAreDone, done: true}).dispatch();
        }else{

        var index = rowData.whoAreDone.indexOf(uid);
        if(index <0){
          rowData.whoAreDone.push(uid); 
          if(rowData.whoAreDone.length === that.props.group.members.length){
          ParseReact.Mutation.Set(target, { whoAreDone: rowData.whoAreDone, done: true}).dispatch();
          }else{
            ParseReact.Mutation.Set(target, { whoAreDone: rowData.whoAreDone}).dispatch();
          }
        }
      }

       // that.refreshQueries();
      }
    }; 
    // Edit button shows up only for the creator
    if(rowData.createdBy === Parse.User.current().id){
      var swipeBtn = [checkFinishBtn, editBtn, deleteBtn];
    }else
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
    var todoData;
    if(this.state.doneSwitchIsOn) {
      todoData = this.data.todosDone;
    } else {
      todoData = this.data.todos;
    }
    return (
      <View style={basicStyles.flex1}>
        <SwitchIOS
          onValueChange={(value) => {this.setState({doneSwitchIsOn: value})}}
          value={this.state.doneSwitchIsOn} />    
        <ListView
          dataSource={this.ds.cloneWithRows(todoData)}
          renderRow={this.renderRow.bind(this)} 
          renderSeparator={this.renderSeparator.bind(this)}/> 
        <AddButton onPress={() => this.onPressNewTodo()} />
      </View>
    );
  }
};

module.exports = TodoList;