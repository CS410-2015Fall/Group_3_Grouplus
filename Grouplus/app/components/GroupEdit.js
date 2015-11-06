'use strict';

var React = require('react-native');
var t = require('tcomb-form-native');
var { View, TouchableHighlight, Text } = React;
var Form = t.form.Form;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var Name = t.struct({name: t.Str});

var basicStyles = require('./helpers/Styles');
var {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform,
} = React;

var NavBar = require('./helpers/NavBar');

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
});

var options = {
  fields: {
    name: {
      label: 'Group Name:',
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

  render() {
    var value = {
      name: this.props.group.name,
    };
    return (
      <View 
        style={basicStyles.blank}>
        <NavBar 
          title={'Edit Group Name'}
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
      </View>
    )
  }
}

module.exports = GroupEdit;