'use strict';

var React = require('react-native');
var TodoList = require('./TodoList');
var Photos = require('./Photos');
var Events = require('./Events');
var About = require('./GroupAbout');
var Separator = require('./helpers/Separator');
var NavBar = require('./helpers/NavBar');

var {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Platform,
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

/**
 * A tab bar navigation element implemented with pure javascript
 * to nav through the todos, photos, and events of a group
 *
 * Side note:
 * At the time of implementation, I did not find a suitable
 * library for tabbar that supports both iOS and Android.
 * We should consider make the tabbar reusable for abstracting it
 * or moving to a library like 
 * https://github.com/exponentjs/react-native-tab-navigator
 * (which is just made available at the time of writing.) 
 */
class GroupPanel extends React.Component {
  constructor(){
    super();
    this.state = {
      selected: 'TodoList'
    }
  }
  gotoAbout(){
    var that = this;
    this.props.navigator.push({
      id:'GroupAbout', 
      group: that.props.group,
    });
  }
  renderNav(){
    if (Platform.OS === 'ios') {
      return (          
        <NavBar
          leftIcon={'material|chevron-left'}
          onPressLeft={()=>this.props.navigator.pop()}
          title={this.props.group.name}
          onPressTitle={()=>this.refs.content.refreshQueries()}
          rightIcon={'material|accounts'}
          onPressRight={this.gotoAbout.bind(this)}/>
      );
    }
  }
  render(){
    return (
      <View style={basicStyles.flex1}>
        {this.renderNav()}
        {this.renderTabContent()}
        <View>
          <Separator/>
          <View style={styles.tabBar}>
            {this.renderTabIcon('material|format-list-bulleted', 'TodoList')}
            {this.renderTabIcon('material|camera', 'Photos')}
            {this.renderTabIcon('material|calendar', 'Events')}
          </View>
        </View>
      </View>
    );
  }
  renderTabContent(){
    var ref = 'content'
    switch (this.state.selected) {
      case 'Photos':
        return <Photos ref={ref} group={this.props.group} navigator={this.props.navigator}/>;
      case 'Events':
        return <Events ref={ref} group={this.props.group} navigator={this.props.navigator}/>;
      case 'TodoList':
      default:
        return <TodoList ref={ref} group={this.props.group} navigator={this.props.navigator}/>;
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