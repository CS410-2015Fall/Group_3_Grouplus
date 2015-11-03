'use strict';

var React = require('react-native');
var t = require('tcomb-form-native');
var { View, TouchableHighlight, Text } = React;
var Form = t.form.Form;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var Group = t.struct({txt: t.Str});

var basicStyles = require('./helpers/Styles');
var {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var NavBar = require('./helpers/NavBar');

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
});

var options = {
  fields: {
    txt: {
      label: 'Group Name:',
      placeholder: 'enter a new group name here',
      autoFocus: true
    }
  }
};

class GroupAdd extends React.Component {
  save() {
    var value = this.refs.form.getValue();
    if (value) {
      var creator = ParseReact.Mutation.Create('Group', {
        name: value.txt,
        createdBy: Parse.User.current().id,
        members: [Parse.User.current().id]
    });
        creator.dispatch();
        this.props.navigator.pop();
    }
  }
  render() {
    return (
      <View 
        style={basicStyles.blank}>
        <NavBar 
          title={'New Group'}
          leftIcon={'material|close'} 
          onPressLeft={()=>this.props.navigator.pop()}
          rightIcon={'material|check'} 
          onPressRight={this.save.bind(this)}/>
        <View style={basicStyles.form}>
          <Form
            ref="form"
            type={Group}
            onChange={this._onChange}
            options={options}
            value={this.props.item}/>
        </View>
      </View>
    )
  }
}

module.exports = GroupAdd;