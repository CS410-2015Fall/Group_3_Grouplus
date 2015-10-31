/**
 * Main app for android
 */

'use strict';

var React = require('react-native');
var {
  DrawerLayoutAndroid,
  ToolbarAndroid,
  Dimensions,
  StyleSheet,
  View,
  Text,
} = React;

var GroupList = require('./GroupList');
var GroupPanel = require('./GroupPanel');

var DRAWER_WIDTH_LEFT = 100;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  toolbar: {
    backgroundColor: '#3399FF',
    height: 58,
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
  drawer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

// Want to have an accumulated list of todos
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

class Grouplus extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      screen: {
        title: 'Grouplus',
        component: StubView,
      },
    }
  }
  onSelectGroup(group){
    this.drawer.closeDrawer();
    this.setState({
      screen: {
        title: group.name,
        component: GroupPanel,
        group: group,
      } 
    })
  }
  render(){
    return (
      <DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={ this.renderDrawer.bind(this) }>
        {this.renderNavigation()}
      </DrawerLayoutAndroid>
      );
  }  
  renderDrawer(){
    return (
      <View style={styles.drawer}>
        <GroupList onPressGroup={this.onSelectGroup.bind(this)} user={{id: "JnzM6wdSIF"}}/>
      </View>
    );
  }
  renderNavigation() {
    var Component = this.state.screen.component;
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          navIcon={require('image!ic_menu_white_24dp')}
          onIconClicked={() => this.drawer.openDrawer()}
          style={styles.toolbar}
          title={this.state.screen.title}
          titleColor='#FFFFFF'
        />
        <Component group={this.state.screen.group}/>
      </View>
    );
  }
};

module.exports = Grouplus;