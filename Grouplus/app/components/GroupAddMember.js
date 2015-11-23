'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var t = require('tcomb-form-native');
var Form = t.form.Form;
var Member = t.struct({email: t.Str});

var NavBar = require('./helpers/NavBar');

var Utils = require('./helpers/Utils'); 

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
  group: {
    alignSelf: 'stretch',
    marginTop: 100,
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
});

var options = {
  fields: {
    email: {
      label: 'Email of Invitee:',
      placeholder: 'abc@gmail.com',
      autoFocus: true
    }
  }
};

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
            Utils.alertToast("Opps, there aren't any user with this email.");
          } else{
            // AddUnique for only adding member once
            var group = {
              className: 'Group',
              objectId: that.props.group.objectId
            };
            var creator = ParseReact.Mutation.AddUnique(group, "members", result[0].id);
            creator.dispatch();
            var pushQuery = new Parse.Query(Parse.Installation);
            pushQuery.equalTo('deviceType', 'ios'); 
            pushQuery.equalTo('user', result[0].id); 
            console.log("USER " + result[0].id);
            // Sending a push notification to the newly added user
            Parse.Push.send({
              where: pushQuery, 
              data: {
                alert: "You have been added to new group '" + that.props.group.name + "'!"
              }
            },{
              success: function() {
                console.log("PUSH SUCCESSFUL");
              },
              error: function(error) {
                throw "Got an error " + error.code + " : " + error.message;
              }
            });
            that.props.navigator.pop();
          }
          // The object was retrieved successfully.
        },
        error: function(error) {
          Utils.alertToast("There was a problem with the internet :( May be try again later.");
        }
      });
    }
  }

  render() {
    return (
      <View 
        style={basicStyles.blank}>
        <NavBar 
          title={'New Member'}
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