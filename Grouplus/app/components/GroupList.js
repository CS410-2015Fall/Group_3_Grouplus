/**
 * Display a list of groups
 */

var React = require('react-native');
var Separator = require('./helpers/Separator');
var mockdata = require('../utils/MockData');
var GroupIcon = require('./GroupIcon');
var GroupPanel = require('./GroupPanel');
var TodoList = require('./TodoList');
var MyAccount = require('./MyAccount');
var {Icon, TabBarIOS} = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;

var {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
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
    backgroundColor: '#48BBEC',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
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
    this.props.navigator.push({
      title: group.name,
      component: GroupPanel,
      passProps: {
        group: group,
      },
    });
  }
  _renderRow(rowData: object) {
    return (
      <View>
        <TouchableHighlight onPress={() => this.onPressRow(rowData)} 
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

  _renderFooter() {
    return (
      <TouchableHighlight style={styles.button}>
        <Text>Add Group</Text>
      </TouchableHighlight>
      );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)} 
        renderFooter={this._renderFooter.bind(this)}
      />
    );
  }
};

module.exports = GroupList;