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
  TouchableHighlight,
} = React;

var { Icon } = require('react-native-icons');

var styles = StyleSheet.create({
  tabBar: {
    width: Dimensions.get('window').width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#FAFAFA',
  },
  tab: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  tabText: {
    fontSize: 10,
  },
  container: {
    flex:1,
  },
  icon: {
    width: 32,
    height: 32,
  },
  iconPlusText: {
    alignItems: 'center',
    flexDirection: 'column'
  },
});

class GroupPanel extends React.Component {
  constructor(){
    super();
    this.state = {
      selected: 'TodoList'
    }
  }
  setTab(tabId){
    this.setState({selected: tabId});
  }
  render(){
    return (
      <View style={styles.container}>
        {this.renderTabContent()}
        <View>
          <Separator/>
          <View style={styles.tabBar}>
            <TouchableHighlight 
              style={styles.tab}
              onPress={() => this.setState({selected: 'TodoList'})}>
              <View style={styles.iconPlusText}>
                <Icon 
                  name='material|list' 
                  size={32} 
                  color={this.state.selected === 'TodoList' ? '#3399FF' : '#D6D6D6'}  
                  style={styles.icon}/>
                <Text style={styles.tabText}> Todos </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.tab} 
              onPress={() => this.setState({selected: 'Photos'})}>
              <View style={styles.iconPlusText}>
                <Icon 
                  name='material|camera' 
                  size={32} 
                  color={this.state.selected === 'Photos' ? '#3399FF' : '#D6D6D6'} 
                  style={styles.icon}/>
                <Text style={styles.tabText}> Photos </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.tab}
              onPress={() => this.setState({selected: 'Events'})}>
              <View style={styles.iconPlusText}>
                <Icon 
                  name='material|calendar' 
                  size={32} 
                  color={this.state.selected === 'Events' ? '#3399FF' : '#D6D6D6'} 
                  style={styles.icon}/>
                <Text style={styles.tabText}> Events </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
  renderTabContent(){
    switch (this.state.selected) {
      case 'Photos':
        return <Photos/>;
      case 'Events':
        return <Events events={this.props.group.events}/>;
      case 'TodoList':
      default:
        return <TodoList todos={this.props.group.todos}/>;
    }
  }
}

GroupPanel.propTypes = {
  group: React.PropTypes.object.isRequired,
}

module.exports = GroupPanel;