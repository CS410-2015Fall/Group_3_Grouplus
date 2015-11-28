/**
 * Main app for android
 */

'use strict';

var React = require('react-native');
var {
  DrawerLayoutAndroid,
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
  drawer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

var actions = [{
  title: 'refresh', 
  show: 'always', 
  showWithText: false
},
{
  title: 'members', 
  show: 'always', 
  showWithText: false}]

class Grouplus extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      group: null,
    };
  }
  onSelectGroup(group){
    this.drawer.closeDrawer();
    this.setState({
      group: group,
    });
  }
  render(){
    return (
      <DrawerLayoutAndroid
        style={styles.container}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={ this.renderDrawer.bind(this) }>
        <GroupPanel group={this.state.group} 
                    navigator={this.props.navigator} 
                    openDrawer={() => this.drawer.openDrawer()}/>
      </DrawerLayoutAndroid>
    );
  }  
  renderDrawer(){
    return (
      <View style={styles.drawer}>
        <GroupList 
          onPressGroup={this.onSelectGroup.bind(this)} 
          user={this.props.user} 
          navigator={this.props.navigator}/>
      </View>
    );
  }
};

module.exports = Grouplus;