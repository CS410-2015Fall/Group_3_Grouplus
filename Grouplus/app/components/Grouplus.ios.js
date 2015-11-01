/**
 * Main app for ios
 */

'use strict';

var React = require('react-native');
var {
  Navigator,
  StyleSheet,
  View,
  Text,
} = React;

var GroupList = require('./GroupList');

var styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#246dd5',
  }
});

class Grouplus extends React.Component {
  render(){
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator}
        navigationBar={
          <Navigator.NavigationBar style={styles.navbar} routeMapper={RouteMapper}/>
        }
      />
    );
  }
  renderScene(route, navigator){
    return (
      <GroupList user={this.props.user} navigator={navigator.parentNavigator}/>
    );
  }  
};

var RouteMapper = {
  
}

module.exports = Grouplus;