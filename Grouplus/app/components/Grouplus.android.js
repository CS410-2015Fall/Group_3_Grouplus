'use strict';

var React = require('react-native');
var {
  BackAndroid,
  Dimensions,
  DrawerLayoutAndroid,
  StyleSheet,
  ToolbarAndroid,
  View,
  Text,
} = React;

var GroupList = require('./GroupList');

var DRAWER_WIDTH_LEFT = 100;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#3399FF',
    height: 56,
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
  }
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

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', 
      this._handleBackButtonPress.bind(this));
  }

  render(){
    return (
      <DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={ this._renderDrawer.bind(this) }>
        {this._renderNavigation()}
      </DrawerLayoutAndroid>
      );
  }  

  _renderDrawer(){
    return (
      <View style={styles.drawer}>
        <GroupList />
      </View>
    );
  }

  _renderNavigation() {
    var Component = this.state.screen.component;
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          navIcon={require('image!ic_menu_white_24dp')}
          onIconClicked={() => this.drawer.openDrawer()}
          style={styles.toolbar}
          title='Grouplus'
          titleColor='#FFFFFF'
        />
        <Component/>
      </View>
    );
  }  

  _handleBackButtonPress() {
  }

};

module.exports = Grouplus;