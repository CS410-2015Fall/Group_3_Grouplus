/**
 * Display a list of todo items
 *
 * TODOs: make it swipable 
 */

var React = require('react-native');

var PixelRatio = require('react-native');

var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
var Parse = require('parse/react-native');
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");
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
  SwitchIOS,
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
  },
  container: {
    flex: 1,
    backgroundColor: '#C5B9C9',
  },
  categoryLabel: {
    fontSize: 24,
    textAlign: 'left',
    left: 10,
    padding:10,
    fontWeight:'bold',
  },
  row: {
    flexDirection: 'row',
    backgroundColor:'white',
    borderRadius: 0,
    borderWidth: 0,
    padding:0,
    borderColor: '#d6d7da',
    padding:10,
    alignItems: 'center'
  },
  rowLabel: {
    left:10,
    fontSize:24,
    flex:1,
  },
  rowInput: {
    right:10,
  },
  buttonContainer: {
    flexDirection: 'column',
    padding:0,
  },
  button: {
    flex: 0.9,
    height: 44,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#ff4d4d',
  },
  textButton: {
    fontSize: 24,
    alignSelf: 'center',
    color: 'white'
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});

class Settings extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      members: props.group.members,
    }
  }

  componentWillMount() {
    // Check if user has turned on exportEvent
    var exportOn = false;
    if (this.props.group.exportEventOn.indexOf(Parse.User.current().id)!=-1) {
      console.log("EXPORT IS ON");
      exportOn = true;
    }
    console.log("SET STATE");
    this.setState({exportEvent: exportOn});
  }

  observe(props, state) {
    return {
      members : new Parse.Query('User').containedIn('objectId', this.props.group.members),
    }
  }

  onPressAddMember() {
    var that = this;
    this.props.navigator.push({
                   id: 'GroupAddMember',
                   group: that.props.group,
                   refresh: that.refreshQueries,
                 });
  }

  OnPressEditGroup() {
    var that = this;
    this.props.navigator.push({
                   id: 'GroupEdit',
                   group: that.props.group,
                   refresh: that.refreshQueries,
                 });
  }

  confirmQuitGroup() {
    if (this.props.group.createdBy === Parse.User.current().id) {
      var msg = 'Are you sure you would like to quit from this group? WARNING: As the creator, it will delete the entire group.';
    } else {
      var msg = 'Are you sure you would like to quit from this group?';
    }
    AlertIOS.alert(
      'Quit Group',
      msg,
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
    if(this.props.group.createdBy === Parse.User.current().id) {
            var target = {
            className: 'Group',
            objectId: this.props.group.objectId,
           };
          console.log("The group creator has deleted the group, deleting " + this.props.group.name);
          ParseReact.Mutation.Destroy(target).dispatch();
    }
    this.props.navigator.replace({
          id: 'GroupList',
          user: Parse.User.current(),
    });
  }

  renderRow(rowData) {
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
    if (this.props.group.createdBy === Parse.User.current().id) {
      var that = this;
      return (
      <View>
            <TouchableOpacity style={styles.button} onPress={that.onPressAddMember.bind(this)}>
              <Icon 
                name={'material|plus'}
                size={32} 
                color={'white'} 
                style={styles.icon}/>
              <Text style={styles.textButton}>Add Member</Text>
            </TouchableOpacity>
      </View>
    );
    }
  }
  renderEditButton() {
    if (this.props.group.createdBy === Parse.User.current().id) {
      return (
        <EditButton onPress={this.OnPressEditGroup.bind(this)}/>
      );
    }
  }
  renderHeader(){
    return (
      <View style={styles.container}>
          <Text style={styles.categoryLabel}>Settings</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Automatic Export Event</Text>
            <SwitchIOS
              onValueChange={(value) => {this.setState({exportEvent: value})}}
              style={styles.rowInput}
              value={this.state.exportEvent} />
          </View>
          <Text style={styles.categoryLabel}>Members</Text>
        </View>
      )
  }

  renderFooter(){
    return (
      <View>
        <View style={styles.buttonContainer}>
        {this.renderAddButton()}
            <TouchableOpacity style={styles.button} onPress={() =>this.confirmQuitGroup()}>
              <Icon 
                name={'material|sign-in'}
                size={32} 
                color={'white'} 
                style={styles.icon}/>
              <Text style={styles.textButton}>Leave Group</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderNav(){
    var backIcon, onBackPressed;
    var title = this.props.group === null ? 'Grouplus' : this.props.group.name;
    var right = '';
    if (this.props.group.createdBy === Parse.User.current().id) {
      var right = 'material|edit';
    }
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
      onPressTitle={()=>this.refreshQueries}
      rightIcon={right} 
      onPressRight={()=>this.OnPressEditGroup()}/>
      );
  }

  render(){
    console.log("EXPORT EVENT : " + this.state.exportEvent);
    return (
      <View style={basicStyles.flex1}>
        {this.renderNav()}
        <ListView
          renderHeader={this.renderHeader}
          dataSource={this.ds.cloneWithRows(this.data.members)}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)} 
          renderFooter={this.renderFooter.bind(this)}
        />
      </View>
    );
  }
};


/*
GroupAbout.propTypes = {
  todos: React.PropTypes.array.isRequired,
}*/

module.exports = Settings;