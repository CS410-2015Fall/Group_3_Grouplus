'use strict';

var React = require('react-native');
var t = require('tcomb-form-native');
var Form = t.form.Form;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

//TODO: tcomb doesn't support android so well
//TODO: Change the wording, this is temporary
var Priority = t.enums({
  L: 'Low',
  M: 'Medium',
  H: 'High',
  C: 'Critical'
});

var ToDo = t.struct({
  txt: t.Str, 
  priority: Priority, 
  duedate: t.Dat,
  individual: t.Bool
});

var {
  View,
  ListView,
  ScrollView,
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
      // TODO: Check if one is the owner, only the owner can change
      label: 'Edit Name',
      placeholder: 'enter a new group name here',
      autoFocus: true
    },
    priority: {
      label: 'Priority'
    },
    duedate: {
      label: 'Due date'
    }
  }
};

class TodoAdd extends React.Component {
  constructor() {
    super();
  }

  save() {
    var value = this.refs.form.getValue();
    var that = this;
    if (value) {
      var creator = ParseReact.Mutation.Create('Todo', {
      name: value.txt,
      createdBy: Parse.User.current().id,
      group: that.props.group,
      dueDate: value.duedate,
      priority: value.priority,
      individual: value.individual,
      done: false,
      whoAreDone: [],
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
          title={'New Todo'}
          leftIcon={'material|close'} 
          onPressLeft={()=>this.props.navigator.pop()}
          rightIcon={'material|check'} 
          onPressRight={this.save.bind(this)}/>
        <ScrollView style={basicStyles.form}>
          <Form
            ref="form"
            type={ToDo}
            onChange={this._onChange}
            options={options}
            value={this.props.item}/>
        </ScrollView>
      </View>
    )
  }
}


module.exports = TodoAdd;