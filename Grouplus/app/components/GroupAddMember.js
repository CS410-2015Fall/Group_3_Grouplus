'use strict';

var React = require('react-native');
var t = require('tcomb-form-native');
var { View, TouchableHighlight, Text } = React;
var Form = t.form.Form;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var Member = t.struct({email: t.Str});

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
      label: 'Add an email of the member you want to add',
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
    this.onUpdate = this.onUpdate.bind(this);
  }

//Create new group member
// TODO: If not unique, send alert??
  onUpdate() {
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
          }
            else{
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
        style={styles.group}
        contentInset={{top:64}}
        automaticallyAdjustContentInsets={false}>
        <Form
          ref="form"
          type={Member}
          onChange={this._onChange}
          options={options}
          value={this.props.item}/>
        <TouchableHighlight
          style={basicStyles.button}
          onPress={this.onUpdate}
          underlayColor='#99d9f4'>
          <Text style={basicStyles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = GroupAddMember;