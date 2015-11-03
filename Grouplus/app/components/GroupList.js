/**
 * Display a list of groups
 */

var React = require('react-native');

var {
  ScrollView,
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var Modal = require('./helpers/Modal');
var Separator = require('./helpers/Separator');
var GroupIcon = require('./GroupIcon');
var GroupPanel = require('./GroupPanel');
var GroupAdd = require('./GroupAdd');
var TodoList = require('./TodoList');
var MyAccount = require('./MyAccount');

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
Parse.initialize("***REMOVED***", "***REMOVED***");

var mockdata = require('../utils/MockData');

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
  navBar: {
    height: 64,
    backgroundColor: '#3399FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: 'white', 
    margin: 10, 
    fontSize: 22,
  },
  navTouchTitle: {
    flex: 1, 
    justifyContent: 'center',
  }
});
var colors = ['#FF9966', '#CCCCFF', '#99CCFF', '#FFCCFF', '#66FFCC']


class GroupList extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  }
  observe(props, state) {
    return {
      user: ParseReact.currentUser,
      groups: new Parse.Query('Group').equalTo('members', this.props.user.id),
    }
  }
  
  onPressRow(group) {
    if (this.props.onPressGroup) {
      this.props.onPressGroup(group);
    } else {
      this.props.navigator.push({
        id: 'GroupPanel',
        group: group,
      });
    }
  }
  onPressNewGroup() {
    this.props.navigator.push({id: 'GroupAdd'});
  }
  onPressMyAccount() {
    this.props.navigator.push({id: 'MyAccount'});
  }
  renderRow(rowData, sectionID, rowID) {
    var color = colors[rowID % colors.length];
    return (
      <View>
        <TouchableHighlight onPress={() => this.onPressRow(rowData)} 
                        underlayColor='#EEEEEE'>
          <View style={styles.group}>
            <GroupIcon color={color} letter={rowData.name.charAt(0)}/>
            <View style={styles.groupDetail}>
              <Text style={styles.groupName}> {rowData.name} </Text>
            </View>
          </View>
        </TouchableHighlight>      
      </View>
    );
  }
  renderSeparator() {
    return (
      <Separator/>
    );
  }
  render() {
    return (
      <View style={basicStyles.flex1}>
        <View style={styles.navBar}>
          <View style={{height: 20}}/> 
          <TouchableOpacity style={styles.navTouchTitle}
            onPress={()=> this.refreshQueries('groups')}>
            <Text style={styles.navTitle}>My Groups</Text>
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.ds.cloneWithRows(this.data.groups)}
          renderRow={this.renderRow.bind(this)} 
          renderSeparator={this.renderSeparator.bind(this)}/>
        <View>
          <TouchableOpacity style={basicStyles.button} 
                              onPress={this.onPressNewGroup.bind(this)}>
            <Text style={basicStyles.buttonText}>Add Group</Text>
          </TouchableOpacity>
          <TouchableOpacity style={basicStyles.button} 
                              onPress={this.onPressMyAccount.bind(this)}>
            <Text style={basicStyles.buttonText}>Setting</Text>
          </TouchableOpacity>
        </View>
      </View>
     );
   }
};

GroupList.propTypes = {
  onPressGroup: React.PropTypes.func, // for android drawer
  navigator: React.PropTypes.object,  // for ios navigation
}

module.exports = GroupList;