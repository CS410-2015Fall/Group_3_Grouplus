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
  Navigator,
  Platform,
} = React;

var { Icon } = require('react-native-icons');

var NavBar = require('./helpers/NavBar');
var Separator = require('./helpers/Separator');
var AddButton = require('./helpers/AddButton');
var GroupIcon = require('./GroupIcon');
var GroupPanel = require('./GroupPanel');
var GroupAdd = require('./GroupAdd');
var TodoList = require('./TodoList');
var MyAccount = require('./MyAccount');

var Utils = require('./helpers/Utils'); 

var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

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
        sceneConfig: Navigator.SceneConfigs.FloatFromRight,
      });
    }
  }
  onPressNewGroup() {
    this.props.navigator.push({id: 'GroupAdd'});
  }
  onPressMyAccount() {
    if (Platform.OS === 'android') {
      Utils.alertToast('Stay Tuned; Android support is coming! :)');
      return;
    }
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
        <NavBar 
          onPressLeft={this.onPressMyAccount.bind(this)}
          leftIcon={'material|account'}
          title='My Groups'
          onPressTitle={()=>this.refreshQueries('groups')}/>
        <ListView
          dataSource={this.ds.cloneWithRows(this.data.groups)}
          renderRow={this.renderRow.bind(this)} 
          renderSeparator={this.renderSeparator.bind(this)}/>
        <AddButton onPress={this.onPressNewGroup.bind(this)}/>
      </View>
     );
   }
};

GroupList.propTypes = {
  onPressGroup: React.PropTypes.func, // for android drawer
  navigator: React.PropTypes.object,  // for ios navigation
}

module.exports = GroupList;