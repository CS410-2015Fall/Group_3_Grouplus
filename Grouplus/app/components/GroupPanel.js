'use strict';

var React = require('react-native');
var TodoList = require('./TodoList');
var Photos = require('./Photos');
var Events = require('./Events');
var Files = require('./Files');
var Settings = require('./Settings');
var Separator = require('./helpers/Separator');

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

var PlainTextScreen = require('./helpers/PlainTextScreen');
var NavBar = require('./helpers/NavBar');

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
  stubView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
      <View style={basicStyles.flex1}>
        {this.props.nav}
        <PlainTextScreen text={'Pick a group from the drawer :)'}/>
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
  refresh(){
    this.refs.content.refreshQueries();
  }
  render(){
    return (
      <View style={basicStyles.flex1}>
        {this.renderTabContent()}
        {this.renderTabBar()}
      </View>
    );
  }
  renderTabBar(){
    return (
      <View>
        <Separator/>
        <View style={styles.tabBar}>
          {this.renderTabIcon('material|format-list-bulleted', 'TodoList')}
          {this.renderTabIcon('material|camera', 'Photos')}
          {this.renderTabIcon('material|file', 'Files')}
          {this.renderTabIcon('material|calendar', 'Events')}
          {this.renderTabIcon('material|settings', 'Settings')}
        </View>
      </View>
    );
  }
  renderTabContent(){
    var ref = 'content'
    if (this.props.group === null) {
      return <StubView nav={this.renderNav()}/>;
    }
    switch (this.state.selected) {
      case 'Photos':
      return <Photos ref={ref} group={this.props.group} navigator={this.props.navigator} 
                     openDrawer={this.props.openDrawer}/>;
      case 'Files':
      return <Files ref={ref} group={this.props.group} navigator={this.props.navigator} 
                     openDrawer={this.props.openDrawer}/>;
      case 'Events':
      return <Events ref={ref} group={this.props.group} navigator={this.props.navigator} 
                     openDrawer={this.props.openDrawer}/> ;
      case 'Settings':
      return <Settings ref={ref} group={this.props.group} navigator={this.props.navigator} 
                       openDrawer={this.props.openDrawer}/>;
      case 'TodoList':
      default:
      return <TodoList ref={ref} group={this.props.group} navigator={this.props.navigator} 
                       openDrawer={this.props.openDrawer}/>;
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
  renderNav(){
    return (          
      <NavBar
        leftIcon={'material|menu'}
        onPressLeft={this.props.openDrawer}
        title={'Grouplus'}/>
      );
  }
}

GroupPanel.propTypes = {
  group: React.PropTypes.object.isRequired,
}

module.exports = GroupPanel;