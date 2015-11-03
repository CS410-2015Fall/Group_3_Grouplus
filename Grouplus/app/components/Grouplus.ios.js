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
  TouchableOpacity
} = React;

var GroupList = require('./GroupList');

var styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#3399FF',
  }
});

class Grouplus extends React.Component {

  render(){  
    var RouteMapper = {
      LeftButton(route, navigator, index, nextState) {
        return (
          <View/>
        );
      },
      RightButton(route, navigator, index, nextState) {
        return (
          <View/>
        );
      },
      Title(route, navigator, index, nextState) {
        return (
          <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{color: 'white', margin: 10, fontSize: 22}}>
              Grouplus
            </Text>
          </TouchableOpacity>
        );
      }
    }
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



module.exports = Grouplus;