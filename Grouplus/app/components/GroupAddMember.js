'use strict';

var React = require('react-native');
var t = require('tcomb-form-native');
var { View, TouchableHighlight, Text } = React;
var Form = t.form.Form;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var Member = t.struct({email: t.Str});
var NavBar = require('./helpers/NavBar');

var basicStyles = require('./helpers/Styles');
var {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var options = {
  fields: {
    email: {
      label: 'Email of Invitee:',
      placeholder: 'abc@gmail.com',
      autoFocus: true
    }
  }
};

var styles = StyleSheet.create({
  group: {
    alignSelf: 'stretch',
    marginTop: 100,
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
});

class GroupAddMember extends React.Component {
  constructor() {
    super();
  }

//Create new group member
// TODO: If not unique, send alert??
  save() {
    var value = this.refs.form.getValue();
    if (value) {
      // Check if the user with that email exists
      var User = Parse.Object.extend("User");
      var query = new Parse.Query(User);
      query.equalTo("email", value.email);
      var that = this;
      query.find({
        success: function(result) {
          console.log("Found the user" + result[0]);
          if(result.length === 0){
            alert("Error: there is no user with that email!");
          } else{
            // AddUnique for only adding member once
            var creator = ParseReact.Mutation.AddUnique({
              className: 'Group',
              //TODO: change the group id
              objectId: that.props.group.objectId
            }, "members", result[0].id);
            creator.dispatch();
            that.props.navigator.pop();
          }
          // The object was retrieved successfully.
        },
        error: function(error) {
          alert("Error: there is no user with that email!");
        }
      });
    }
  }

  render() {
    return (
      <View 
        style={basicStyles.blank}>
        <NavBar 
          title={'New Invite'}
          leftIcon={'material|close'} 
          onPressLeft={()=>this.props.navigator.pop()}
          rightIcon={'material|check'} 
          onPressRight={this.save.bind(this)}/>
        <View style={basicStyles.form}>
          <Form
            ref="form"
            type={Member}
            onChange={this._onChange}
            options={options}
            value={this.props.item}/>
        </View>
      </View>
    )
  }
}

module.exports = GroupAddMember;