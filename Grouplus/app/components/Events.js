/**
* Display uploaded photos and UI for adding new ones.
*/
var React = require('react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
var Parse = require('parse/react-native');
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var EventItem = require('./EventItem');
var Swipeout = require('./helpers/Swipeout');
var Separator = require('./helpers/Separator');
var EventAdd = require('./EventAdd');
var mockdata = require('../utils/MockData');
var NavBar = require('./helpers/NavBar');

var {
  StyleSheet,
  View,
  ListView,
  Text,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  SwitchIOS,
} = React;

var Utils = require('./helpers/Utils'); 
var {
  CalendarManager
} = require('NativeModules');
var {CalendarModule} = require('NativeModules');
var AddButton = require('./helpers/AddButton');

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection: 'row',
  height: 70,
  borderRadius: 4,
  borderWidth: 0.5,
  margin: 3,
},
name: {
  fontSize: 18,
},
});

class Events extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
        doneSwitchIsOn: false
      }
  }
  observe(props, state) {
    var current = new Date();
    return {
      pastEvents: (new Parse.Query('Event')).equalTo('groupId', this.props.group.objectId).lessThan('dueDate', current).descending('dueDate'),
      events: (new Parse.Query('Event')).equalTo('groupId', this.props.group.objectId).greaterThanOrEqualTo('dueDate', current).ascending('dueDate'),
    }
  }
  onPressNewEvent() {
    var that = this;
    this.props.navigator.push({
      id: 'EventAdd', 
      groupId: that.props.group.objectId, 
      status: 'add',
      refresh: that.refreshQueries.bind(that),
    });
  }

  renderRow(rowData) {
    var exportBtn = {
      text: 'Export', 
      backgroundColor: '#FFA500',
      onPress: function(){
       if (Platform.OS === 'ios') {
        CalendarManager.addEvent(rowData.name, rowData.location, rowData.dueDate, rowData.enddate, 
          (response) =>{
            if(response){
              alert("Export Successful!");
            }else{
              alert("Export Event Failed. Please check event date format or access to calcendar!");
            }
          });
        } else {
          CalendarModule.addEvent(rowData.name, rowData.location, rowData.dueDate.getMilliseconds(), rowData.enddate.getMilliseconds());
        }
      }
    } 

    var that = this;
    var editBtn = {
      text: 'Edit', 
      backgroundColor:'#ffd805',
      onPress: function(){
        that.props.navigator.push({
        id: 'EventAdd',
        groupId: that.props.group.objectId,
        currentEvent: rowData,
        refresh: that.refreshQueries.bind(that),
        status: 'edit',
        });
      }
    }

  var deleteBtn = {
    text: 'Delete', 
    backgroundColor: '#ff0000',
    onPress: function(){
      var target = {
        className: 'Event',
        objectId: rowData.objectId,
      };
      ParseReact.Mutation.Destroy(target).dispatch();
    }
  };
  
  // Edit button shows up only for the creator
  if(rowData.createdBy === Parse.User.current().id){
    var swipeBtn = [exportBtn, editBtn, deleteBtn];
  }else
    var swipeBtn = [exportBtn];

  return (
    <Swipeout backgroundColor={'#fff'} autoClose={true} right={swipeBtn}>
      <View stylle={styles.container}>
        <EventItem event={rowData}/>
        <Separator/>
      </View>
    </Swipeout>
  );
}
  renderNav(){
    var backIcon, onBackPressed;
    var title = this.props.group === null ? 'Grouplus' : this.props.group.name;
    if (Platform.OS === 'ios') {
      backIcon = 'material|chevron-left';
      onBackPressed = this.props.navigator.pop.bind(this);
    } else {
      backIcon = 'material|menu';
      onBackPressed = this.props.openDrawer;
    }
    return (          
      <NavBar
      leftIcon={backIcon}
      onPressLeft={onBackPressed}
      title={title}
      onPressTitle={()=>this.refreshQueries}/>
      );
  }

  render(){
    var events;
      if(this.state.doneSwitchIsOn) {
        console.log("todoData true + " + this.state.doneSwitchIsOn);
        events = this.data.pastEvents;
      } else {
        console.log("todoData false+ " + this.state.doneSwitchIsOn);
        events = this.data.events;
      }
    return (
      <View style={basicStyles.flex1}>
        {this.renderNav()}
        <SwitchIOS
          onValueChange={(value) => {this.setState({doneSwitchIsOn: value})}}
          value={this.state.doneSwitchIsOn} />    
        <ListView 
          dataSource={this.ds.cloneWithRows(events)}
          renderRow={this.renderRow.bind(this)} />
        <AddButton
          onPress={()=> this.onPressNewEvent()}/>
      </View>
    );
  }
};

module.exports = Events;