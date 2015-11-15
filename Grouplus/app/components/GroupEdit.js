'use strict';

var React = require('react-native');
var t = require('tcomb-form-native');
var { View, TouchableHighlight, Text } = React;
var Form = t.form.Form;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var GroupList = require('./GroupList')

var Name = t.struct({name: t.Str});

var basicStyles = require('./helpers/Styles');
var {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform,
  AlertIOS,
} = React;

var NavBar = require('./helpers/NavBar');

var { Icon } = require('react-native-icons');

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F82020',
    position: 'absolute',
    bottom: 15,
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});

var options = {
  fields: {
    name: {
      label: 'Edit Group Name:',
      autoFocus: true
    }
  }
};

class GroupEdit extends React.Component {
  save() {
    var that = this;
    var value = this.refs.form.getValue();
    if (value) {
      var target = {
        className: 'Group',
        objectId: that.props.group.objectId,
      };      
      var creator = ParseReact.Mutation.Set(target, 
        {name: value.name}).dispatch();
        alert("Group name successfully changed!");
        this.props.navigator.pop();      
    }
  }

  confirmDeleteGroup() {
    AlertIOS.alert(
      'Delete Group',
      'Are you sure you would like to delete this group?',
      [
        {text: 'Yes', onPress: () => this.deleteGroup()},
        {text: 'Cancel'},
      ]
    )
  }

  deleteGroup() {
      var target = {
      className: 'Group',
      objectId: this.props.group.objectId,
     };
    ParseReact.Mutation.Destroy(target).dispatch();
    this.props.navigator.replace({
          id: 'GroupList',
          user: Parse.User.current(),
    });
  }

  render() {
    var value = {
      name: this.props.group.name,
    };
    return (
      <View 
        style={basicStyles.blank}>
        <NavBar 
          title={'Settings'}
          leftIcon={'material|close'} 
          onPressLeft={()=>this.props.navigator.pop()}
          rightIcon={'material|check'} 
          onPressRight={this.save.bind(this)}/>
        <View style={basicStyles.form}>
          <Form
            ref="form"
            type={Name}
            value= {value}
            onChange={this._onChange}
            options={options}/>
        </View>
        <TouchableHighlight style={styles.button} onPress={() => this.confirmDeleteGroup()}>
          <Icon 
            name={'material|delete'}
           size={32} 
           color={'white'} 
           style={styles.icon}/>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = GroupEdit;