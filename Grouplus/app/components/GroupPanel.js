'use strict';

var React = require('react-native');
var TodoList = require('./TodoList');
var Photos = require('./Photos');
var Events = require('./Events');
var Separator = require('./helpers/Separator');

var {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} = React;

var { Icon } = require('react-native-icons');

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
  tabBar: {
    alignSelf: 'stretch',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  tabText: {
    fontSize: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconPlusText: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

class GroupPanel extends React.Component {
  constructor(){
    super();
    this.state = {
      selected: 'Todos'
    }
  }
  setTab(tabId){
    this.setState({selected: tabId});
  }
  render(){
    return (
      <View style={basicStyles.flex1}>
        {this.renderTabContent()}
        <View>
          <Separator/>
          <View style={styles.tabBar}>
            {this.renderTabIcon('material|format-list-bulleted', 'Todos')}
            {this.renderTabIcon('material|camera', 'Photos')}
            {this.renderTabIcon('material|calendar', 'Events')}
          </View>
        </View>
      </View>
    );
  }
  renderTabContent(){
    switch (this.state.selected) {
      case 'Photos':
        return <Photos navigator={this.props.navigator}/>;
      case 'Events':
        return <Events events={this.props.group.events}
                       navigator={this.props.navigator}/>;
      case 'TodoList':
      default:
        return <TodoList todos={this.props.group.todos}
                         group={this.props.group}
                         navigator={this.props.navigator}/>;
    }
  }
  renderTabIcon(iconName, name){
    var color = this.state.selected === name ? '#3399FF' : '#CCCCCC';
    return (
      <TouchableWithoutFeedback
        onPress={() => this.setState({selected: name})}>
        <View style={styles.iconPlusText}>
          <Icon 
            name={iconName}
            size={32} 
            color={color} 
            style={styles.icon}/>
          <Text style={[styles.tabText, {color: color}]}> {name} </Text>
        </View>
      </TouchableWithoutFeedback>
      );
  }
}

GroupPanel.propTypes = {
  group: React.PropTypes.object.isRequired,
}

module.exports = GroupPanel;