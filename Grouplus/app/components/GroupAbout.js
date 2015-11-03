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
var ParseComponent = ParseReact.Component(React);

var {
  View,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  NavigatorIOS,
  TouchableOpacity,
} = React;

var NavBar = require('./helpers/NavBar');
var Modal = require('react-native-modalbox');
var Separator = require('./helpers/Separator');
var AddButton = require('./helpers/AddButton');
var GroupAddMember = require('./GroupAddMember');
var UserIcon = require('./UserIcon');

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
  group: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
  },
  groupDetail: {
    marginVertical: 10,
  },
  groupName: {
    fontSize: 24,
  }
});

class GroupAbout extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  }
  observe(props, state) {
    return {
    members : new Parse.Query("User").containedIn("objectId", this.props.group.members),
    }
  }
  onPressAddMember() {
    var that = this;
    this.props.navigator.push({
                   id: 'GroupAddMember',
                   group: that.props.group,
                 });
  }
  renderRow(rowData) {
    console.log("FACE ID : " + rowData.facebookId);
    return (
      <View>
        <View style={styles.group}>
          <UserIcon user={rowData}/>
          <View style={styles.groupDetail}>
            <Text style={styles.groupName}> {rowData.name} </Text>
          </View>
        </View>
        
      </View>
    );
  }
  renderSeparator() {
    return <Separator/>;
  }
  render(){
    return (
      <View style={basicStyles.blank}>
        <NavBar 
          title={'Members'}
          leftIcon={'material|close'} 
          onPressLeft={()=>this.props.navigator.pop()}/>
        <ListView
          dataSource={this.ds.cloneWithRows(this.data.members)}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)} 
        />
        <AddButton onPress={this.onPressAddMember.bind(this)}/>
      </View>
    );
  }
};

/*
GroupAbout.propTypes = {
  todos: React.PropTypes.array.isRequired,
}*/

module.exports = GroupAbout;