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
  stubView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  stubText: {
    fontSize: 36,
    textAlign: 'center',
    color: '#3399FF',
    margin: 40,
  },
  spacer: {
    flex: 1,
  },
});

class StubView extends React.Component {
  render() {
    return (
      <View style={styles.stubView}>
        <View style={styles.spacer}/>
        <Text style={styles.stubText}>
          Pick a group from the drawer :) 
        </Text>
        <View style={styles.spacer}/>
      </View>
      );
  }
}

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
    var backIcon, onBackPressed;
    var title = this.props.group === null ? 'Grouplus' : this.props.group.name;
    if (Platform.OS === 'ios') {
      backIcon = 'material|chevron-left';
      onBackPressed = this.props.navigator.pop.bind(this);
    } else {
      backIcon = 'material|menu';
      onBackPressed = this.props.openDrawer;
    }
    return (          
      <NavBar
        leftIcon={backIcon}
        onPressLeft={onBackPressed}
        title={title}
        onPressTitle={()=>this.refresh()}
        rightIcon={'material|settings'}
        onPressRight={this.gotoAbout.bind(this)}/>
    );
  }
  refresh(){
    this.refs.content.refreshQueries();
  }
  render(){
    return (
      <View style={basicStyles.flex1}>
        {this.renderNav()}
        {this.renderTabContent()}
        {this.renderTabBar()}
      </View>
    );
  }
  renderScreen(){

  }
  renderTabBar(){
    return (
      <View>
        <Separator/>
        <View style={styles.tabBar}>
          {this.renderTabIcon('material|format-list-bulleted', 'TodoList')}
          {this.renderTabIcon('material|camera', 'Photos')}
          {this.renderTabIcon('material|calendar', 'Events')}
        </View>
      </View>
    );
  }
  renderTabContent(){
    var ref = 'content'
    if (this.props.group === null) {
      return <StubView/>;
    }
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