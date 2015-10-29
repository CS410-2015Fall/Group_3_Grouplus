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
  NavigatorIOS,
} = React;

var Modal = require('react-native-modalbox');

var Separator = require('./helpers/Separator');
var GroupIcon = require('./GroupIcon');
var GroupPanel = require('./GroupPanel');
var GroupAdd = require('./GroupAdd');
var TodoList = require('./TodoList');
var MyAccount = require('./MyAccount');

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
      groups: new Parse.Query('Group'),
    }
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
  renderRow(rowData, sectionID, rowID) {
    var color = colors[rowID % colors.length];
    return (
      <View>
        <TouchableHighlight onPress={() => this.onPressRow(rowData)} 
                        navigator={this.props.navigator}
                        underlayColor='#E6FFFF'>
          <View style={styles.group}>
            <GroupIcon color={color} letter={rowData.name.charAt(0)}/>
            <View style={styles.groupDetail}>
              <Text style={styles.groupName}> {rowData.name} </Text>
            </View>
          </View>
        </TouchableHighlight>
        <Separator/>
      </View>
    );
  }
  //TODO: render this somewhere else, preferably a fab 
  //      (floating action button)
  renderFooter() {
    return (
      <TouchableHighlight style={basicStyles.button} 
                          onPress={this.onPressNewGroup.bind(this)}>
        <Text style={basicStyles.bottonText}>Add Group</Text>
      </TouchableHighlight>
      );
  }
  render() {
     return (
       <View style={basicStyles.flex1}>
         <ListView
           dataSource={this.ds.cloneWithRows(this.data.groups)}
           renderRow={this.renderRow.bind(this)} 
           renderFooter={this.renderFooter.bind(this)}
         />
         <Modal ref={'addGroup'}>
           <GroupAdd/>
         </Modal>
       </View>
     );
   }
};

GroupList.propTypes = {
  onPressGroup: React.PropTypes.func, // for android drawer
  navigator: React.PropTypes.object,  // for ios navigation
}

module.exports = GroupList;