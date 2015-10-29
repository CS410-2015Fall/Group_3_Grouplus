/**
 * Display a list of groups
 */

var React = require('react-native');
var Separator = require('./helpers/Separator');
var mockdata = require('../utils/MockData');
var GroupIcon = require('./GroupIcon');
var GroupPanel = require('./GroupPanel');
var GroupAdd = require('./GroupAdd');
var TodoList = require('./TodoList');
var MyAccount = require('./MyAccount');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var {
  ScrollView,
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  NavigatorIOS,
} = React;

var Modal = require('react-native-modalbox');

var Separator = require('./helpers/Separator');
var GroupIcon = require('./GroupIcon');
var GroupPanel = require('./GroupPanel');
var GroupAdd = require('./GroupAdd');
var TodoList = require('./TodoList');
var MyAccount = require('./MyAccount');

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
  }
});
var colors = ['#FF9966', '#CCCCFF', '#99CCFF', '#FFCCFF', '#66FFCC']
// initializing Parse
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var group = Parse.Object.extend('Group');
var query = new Parse.Query(group);
var groupList = [];
// TODO: Return only the group that I am part of
//query.equalTo("createdBy", Parse.User.current().id);

    
class GroupList extends React.Component{
  constructor(props){
    super(props);
    this.handleData=this.handleData.bind(this);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = { 
      dataSource: this.ds.cloneWithRows(groupList),
    };
    query.find({
      success: this.handleData
    });
  }

  handleData(results) {
    var that = this;
    for (var i = 0; i < results.length; ++i) {
          var object = results[i];
          groupList.push(object);
          console.log("this.state.groups: " + object.get('Name'));

        }
        // that.setState({dataSource : groupList});
    this.setState({dataSource : that.ds.clonewithRows(results) });
  }

 // Does not work... returns undefined
  //  observe() {
  //   return {
  //     user: Parse.User.current().id,
  //     groups: (new Parse.Query('Group'))
  //     //.contains('members', Parse.User.current().id)
  //   };
  // }
  
  componentDidMount() {


  }
  onPressRow(group) {
    if (this.props.onPressGroup) {
      this.props.onPressGroup(group);
    } else {
      this.props.navigator.push({
        title: group.name,
        component: GroupPanel,
        passProps: {
          group: group,
        },
      });
    }
  }
  onPressNewGroup() {
    this.refs.addGroup.open();
  }
  render() {
    return (
      <View style={basicStyles.flex1}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} 
          renderFooter={this.renderFooter.bind(this)}
        />
        <Modal ref={'addGroup'}>
          <GroupAdd/>
        </Modal>
      </View>
    );
  }
  renderRow(rowData, sectionID, rowID) {
    var color = colors[rowID % colors.length];
    return (
      <View>
        <TouchableHighlight onPress={() => this.onPressRow(rowData)} 
                        navigator={this.props.navigator}
                        underlayColor='#E6FFFF'>
          <View style={styles.group}>
            <GroupIcon color={color} letter={rowData.Name.charAt(0)}/>
            <View style={styles.groupDetail}>
              <Text style={styles.groupName}> {rowData.Name} </Text>
            </View>
          </View>
        </TouchableHighlight>
        <Separator/>
      </View>
    );
  }
  //TODO: render this somewhere else
  renderFooter() {
    return (
      <TouchableHighlight style={basicStyles.button} 
                          onPress={() => this.onPressNewGroup()}>
        <Text style={basicStyles.bottonText}>Add Group</Text>
      </TouchableHighlight>
      );
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} 
        renderFooter={this.renderFooter.bind(this)}/>
    );
  }
};

GroupList.propTypes = {
  onPressGroup: React.PropTypes.func, // for android drawer
  navigator: React.PropTypes.object,  // for ios navigation
}

module.exports = GroupList;