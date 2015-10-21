'use strict';

var React = require('react-native');
var TodoList = require('./TodoList');
var Photos = require('./Photos');
var Events = require('./Events');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} = React;

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    margin:50,
    fontSize: 45
  }
});

class GroupPanel extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedTab: 'TodoList'
    }
  }
  setTab(tabId){
    this.setState({selectedTab: tabId})
  }
  render(){
    return (
      <TabBarIOS barTintColor="white" tintColor="blue">
        <TabBarIOS.Item
          title='TodoList'
          selected={this.state.selectedTab === 'TodoList'}
          onPress={() => this.setTab('TodoList')}>
          <TodoList todos={this.props.group.todos}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Photos"
          selected={this.state.selectedTab === 'Photos'}
          onPress={() => this.setTab('Photos')}>
          <Photos/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Events"
          selected={this.state.selectedTab === 'Events'}
          onPress={() => this.setTab('Events')}>
          <Events/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

GroupPanel.propTypes = {
  group: React.PropTypes.object.isRequired,
}

module.exports = GroupPanel;