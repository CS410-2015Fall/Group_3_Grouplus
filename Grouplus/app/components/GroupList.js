/**
 * Display a list of groups
 */

var React = require('react-native');
var Separator = require('./helpers/Separator');
var mockdata = require('../utils/MockData');
// To avoid the error for now
//var GroupIcon = require('./GroupIcon');
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    margin: 3,
  },
  name: {
    fontSize: 18,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#3399FF',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottonText: {
    color: 'white',
    fontSize: 20,
  }
});
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
    for (var i = 0; i < results.length; ++i) {
          var object = results[i];
          groupList.push(object);
          console.log("this.state.groups: " + object.get('Name'));

        }
        // that.setState({dataSource : groupList});
        this.setState({dataSource : this.ds.clonewithRows(results) })
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

var that = this;

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
    this.props.navigator.push({
      title: 'Add New Group',
      component: GroupAdd,
    });
  }

  renderRow(rowData: object) {
    // TODO: Add member photos to UI
    // <GroupIcon members={rowData.members}/>
    return (
      <View>
        <TouchableHighlight onPress={() => this.onPressRow(rowData)} 
                        navigator={this.props.navigator}
                        underlayColor='#E6FFFF'>
          <View style={styles.container}>
            <Text> {rowData.get('Name')} </Text>
          </View>
        </TouchableHighlight>
        <Separator/>
      </View>
    );
  }

  renderFooter() {
    return (
      <TouchableHighlight style={styles.button} onPress={() => this.onPressNewGroup()}>
        <Text style={styles.bottonText}>Add Group</Text>
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