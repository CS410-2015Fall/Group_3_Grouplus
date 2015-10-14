/**
 * Display a list of groups
 */

var React = require('react-native');
var Separator = require('./helpers/Separator');
var mockdata = require('../utils/MockData');
var GroupIcon = require('./GroupIcon');
var TodoList = require('./TodoList');

var {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
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
      component: TodoList,
      passProps: {
        todos: group.todos,
      },
    });
  }
  renderRow(rowData: object) {
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
  render() {
    return (
      <ListView
        styles
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} 
      />
    );
  }
};

module.exports = GroupList;