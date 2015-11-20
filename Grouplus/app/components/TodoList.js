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
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  NetInfo,
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
    this.state = {todoList: ""};
    NetInfo.isConnected.fetch().done((connected) => {this.setState({"isConnected": connected});});
    AsyncStorage.getItem("todos"+this.props.group.objectId).then((value) => {
          if(value !== null && value.length >0){
              this.setState({"todoList": JSON.parse(value)});   
          }
    });
  }
  observe(props, state) {
    var queryGroupTodoDone = (new Parse.Query('Todo')).notEqualTo('individual', true).equalTo('group', this.props.group.objectId).containsAll('whoAreDone', this.props.group.members); 
    var queryGroupTodo =  (new Parse.Query('Todo')).notEqualTo('individual', true).equalTo('group', this.props.group.objectId).equalTo('done', false);//doesNotMatchKeyInQuery('objectId', 'objectId', queryGroupTodoDone); 
    var queryPersonTodo = (new Parse.Query('Todo')).equalTo('individual', true).equalTo('group', this.props.group.objectId).equalTo('createdBy', Platform.OS === 'ios' ? Parse.User.current().id : "jIZUlILeeI").equalTo('done', false);
    return {
      todos: Parse.Query.or(queryGroupTodo, queryPersonTodo)
    }
  }
  /*
  componentDidMount(){
     //AsyncStorage.setItem("appleKey", 'testval');
    AsyncStorage.getItem("todosAll").then((value) => {
          if(value.length>0){
              this.setState({"todoList": JSON.parse(value)});   
          }else{
              this.setState({"todoList": null});
          }
        }).done();
  }*/
  componentDidUpdate(){
        alert(this.state.isConnected);
     if(this.data.todos.length>0 && this.props.group.objectId !== null){
         AsyncStorage.setItem("todos"+this.props.group.objectId, JSON.stringify(this.data.todos)); 
      }
  }

  updateAsync(data){
    AsyncStorage.setItem("todos"+this.props.group.objectId, JSON.stringify(this.data.todos)); 
  }
/*
  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: this.ds.cloneWithRows(this.data.todos)});
  }
  */
  onPressNewTodo() {
    if (Platform.OS === 'android') {
      Utils.alertToast('Stay Tuned; Android support is coming! :)');
      return;
    }
    //console.log("group ID pass to TODO : " + this.props.group.objectId);
    this.props.navigator.push({
      id: 'TodoAdd',
      group: this.props.group.objectId,
      refresh: this.refreshQueries.bind(this),
    });
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
        // force to delete from asynchorous storage as well
        AsyncStorage.setItem("todos"+that.props.group.objectId, JSON.stringify(that.data.todos)); 
        that.setState({"todoList": that.data.todos});  
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
          ParseReact.Mutation.Set(target, {done: true}).dispatch();
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
          dataSource={this.ds.cloneWithRows(this.data.todos.length > 0 ? this.data.todos : this.state.todoList)}
          renderRow={this.renderRow.bind(this)} 
          renderSeparator={this.renderSeparator.bind(this)}/>       
        <AddButton onPress={() => this.onPressNewTodo()}/>
      </View>
    );
  }
};

module.exports = TodoList;