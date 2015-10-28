/**
 * Display a list of groups
 */

var React = require('react-native');
var Modal = require('react-native-modalbox');

var Separator = require('./helpers/Separator');
var mockdata = require('../utils/MockData');
var GroupIcon = require('./GroupIcon');
var GroupPanel = require('./GroupPanel');
var GroupAdd = require('./GroupAdd');
var TodoList = require('./TodoList');
var MyAccount = require('./MyAccount');

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
  view: {
    flex: 1,
  },
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
  },
  modal: {
    flex: 1,
  }
});

class GroupList extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = { 
      dataSource: this.ds.cloneWithRows(mockdata.groups),
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

  renderRow(rowData: object) {
    return (
      <View>
        <TouchableHighlight onPress={() => this.onPressRow(rowData)} 
                        navigator={this.props.navigator}
                        underlayColor='#E6FFFF'>
          <View style={styles.container}>
            <GroupIcon members={rowData.members}/>
            <Text> {rowData.name} </Text>
          </View>
        </TouchableHighlight>
        <Separator/>
      </View>
    );
  }

  //render this somewhere else
  renderFooter() {
    return (
      <TouchableHighlight style={styles.button} 
                          onPress={() => this.onPressNewGroup()}>
        <Text style={styles.bottonText}>Add Group</Text>
      </TouchableHighlight>
      );
  }

  render() {
    return (
      <View style={styles.view}>
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
};

GroupList.propTypes = {
  onPressGroup: React.PropTypes.func, // for android drawer
  navigator: React.PropTypes.object,  // for ios navigation
}

module.exports = GroupList;