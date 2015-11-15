'use strict';
/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var t = require('tcomb-form-native');
var Form = t.form.Form;

var Event = t.struct({
  name: t.Str, 
  location: t.maybe(t.Str),
  eventstartdate: t.Dat,
  eventenddate: t.Dat
});

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
} = React;

var NavBar = require('./helpers/NavBar');


var options = {
  fields: {
    name: {
      label: 'Enter you event name',
      placeholder: 'enter a event name here',
      autoFocus: true
    },
    location: {
      label: 'Enter your event location',
      placeholder: 'enter location here',
      autoFocus: true
    },
    eventstartdate: {
      label: 'Start Time',
    },
    eventenddate:{
      label: 'End Time',
    }

  }
};

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({  
  event: {
    marginTop: 100,
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  saveButton: {
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
});

class EventCreation extends React.Component{
  constructor() {
    super();
  }

  save() {
    var value = this.refs.form.getValue();
    if (value){
      var creator = ParseReact.Mutation.Create('Event', {
          name: value.name,
          createdBy: Parse.User.current().id,
          location: value.location,
          groupId: this.props.groupId, 
          dueDate: value.eventstartdate,
          enddate: value.eventenddate
      });
      creator.dispatch();
      this.props.navigator.pop();
    }
  }


  render(){
    return (
      <View 
        style={basicStyles.blank}>
        <NavBar 
          title={'New Event'}
          leftIcon={'material|close'} 
          onPressLeft={()=>this.props.navigator.pop()}
          rightIcon={'material|check'} 
          onPressRight={this.save.bind(this)}/>
        <ScrollView style={basicStyles.form}>
          <Form
            ref="form"
            type={Event}
            onChange={this._onChange}
            options={options}
            value={this.props.item}/>
        </ScrollView>
      </View>
    );
  }
}

module.exports = EventCreation;