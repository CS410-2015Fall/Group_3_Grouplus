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
var { Icon } = require('react-native-icons');

var {
  View,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  NavigatorIOS,
  TouchableOpacity,
  Platform,
  AlertIOS,
} = React;

var NavBar = require('./helpers/NavBar');
var Separator = require('./helpers/Separator');
var AddButton = require('./helpers/AddButton');
var EditButton = require('./helpers/EditButton');
var GroupAddMember = require('./GroupAddMember');
var UserIcon = require('./UserIcon');
var GroupEdit = require('./GroupEdit');

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
    this.state = {
      members: props.group.members,
    }
  }
  observe(props, state) {
    return {
      members : new Parse.Query('User').containedIn('objectId', state.members),
    }
  }
  refresh() {
    var that = this;
    new Parse.Query('Group').equalTo('objectId', this.props.group.objectId).first({
      success: function(results) {
        that.setState({members: results.get('members')});
      }
    });
  }
  onPressAddMember() {
    var that = this;
    this.props.navigator.push({
                   id: 'GroupAddMember',
                   group: that.props.group,
                   refresh: that.refresh.bind(that),
                 });
  }
  OnPressEditGroup() {
    var that = this;
    this.props.navigator.push({
                   id: 'GroupEdit',
                   group: that.props.group,
                   refresh: that.refresh.bind(that),
                 });
  }

  confirmQuitGroup() {
    AlertIOS.alert(
      'Quit Group',
      'Are you sure you would like to quit from this group?',
      [
        {text: 'Yes', onPress: () => this.quitGroup()},
        {text: 'Cancel'},
      ]
    )
  }

  quitGroup() {
      var target = {
      className: 'Group',
      objectId: this.props.group.objectId,
     };
    ParseReact.Mutation.Remove(target, 'members', Parse.User.current().id).dispatch();
    // Delete the group if there is no more member left in group
    if(this.props.group.members.length === 0) {
            var target = {
            className: 'Group',
            objectId: this.props.group.objectId,
           };
          console.log("The group has no more member, deleting " + this.props.group.name);
          ParseReact.Mutation.Destroy(target).dispatch();
    }
    this.props.navigator.replace({
          id: 'GroupList',
          user: Parse.User.current(),
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
  renderAddButton() {
    if (this.props.group.createdBy === (Platform.OS === 'ios' ? Parse.User.current().id : "jIZUlILeeI")) {
      return (
        <AddButton onPress={this.onPressAddMember.bind(this)}/>
      );
    }
  }
  renderEditButton() {
    if (this.props.group.createdBy === (Platform.OS === 'ios' ? Parse.User.current().id : "jIZUlILeeI")) {
      return (
        <EditButton onPress={this.OnPressEditGroup.bind(this)}/>
      );
    }
  }
  render(){
    return (
      <View style={basicStyles.blank}>
        <NavBar 
          title={'Members'}
          onPressTitle={()=>{this.refresh()}}
          leftIcon={'material|close'} 
          onPressLeft={()=>this.props.navigator.pop()}
          rightIcon={'material|sign-in'} 
          onPressRight={()=>this.confirmQuitGroup()}/>
        <ListView
          dataSource={this.ds.cloneWithRows(this.data.members)}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)} 
        />
        {this.renderAddButton()}
        {this.renderEditButton()}
      </View>
    );
  }
};

/*
GroupAbout.propTypes = {
  todos: React.PropTypes.array.isRequired,
}*/

module.exports = GroupAbout;