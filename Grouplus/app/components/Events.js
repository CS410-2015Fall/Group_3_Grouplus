/**
* Display uploaded photos and UI for adding new ones.
*/
var React = require('react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
var Parse = require('parse/react-native');
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var Modal = require('react-native-modalbox');
var EventItem = require('./EventItem');
var Swipeout = require('./helpers/Swipeout');
var Separator = require('./helpers/Separator');
var EventAdd = require('./EventAdd');
var mockdata = require('../utils/MockData');


var {
StyleSheet,
View,
ListView,
Text,
Platform,
TouchableHighlight,
} = React;

var {
  CalendarManager
} = require('NativeModules');

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
}
observe(props, state) {
  return {
    events: (new Parse.Query('Event')).equalTo('groupId', this.props.group.objectId).ascending('dueDate'),
  }
}
onPressNewEvent() {
  var that = this;
  this.props.navigator.push({id: 'EventAdd', groupId: that.props.group.objectId});
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
    }
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

   var swipeBtn = [exportBtn, deleteBtn];

  return (
      <Swipeout backgroundColor={'#fff'} autoClose={true} right={swipeBtn}>
    <View stylle={styles.container}>
      <EventItem event={rowData}/>
      <Separator/>
    </View>
    </Swipeout>
  );
}
render(){
  return (
    <View style={basicStyles.flex1}>
      <ListView 
        dataSource={this.ds.cloneWithRows(this.data.events)}
        renderRow={this.renderRow.bind(this)} />
      <TouchableHighlight 
        style={basicStyles.button}
        onPress={()=> this.onPressNewEvent()}>
        <Text style={basicStyles.buttonText}>Add Events</Text>
      </TouchableHighlight>
    </View>
  );
}
};

module.exports = Events;