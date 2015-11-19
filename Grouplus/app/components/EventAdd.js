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
    var that = this;
    if (value){
      if(this.props.currentEvent) {
        var target = {
          className: 'Event',
          objectId: that.props.currentEvent.objectId,
        };  
        var creator = ParseReact.Mutation.Set(target, {
          name: value.name,
          location: value.location,
          dueDate: value.eventstartdate,
          enddate: value.eventenddate
        }); 
        } else {
        var creator = ParseReact.Mutation.Create('Event', {
          name: value.name,
          createdBy: Parse.User.current().id,
          location: value.location,
          groupId: this.props.groupId, 
          dueDate: value.eventstartdate,
          enddate: value.eventenddate
          });
      }     
    creator.dispatch();
    this.props.refresh();
    this.props.navigator.pop();
    }
  }


  render(){
    if(this.props.status === 'edit') {
      var title = 'Edit Event';
      var value = {
        name: this.props.currentEvent.name,  
        location: this.props.currentEvent.location,
        eventstartdate: this.props.currentEvent.dueDate,
        eventenddate: this.props.currentEvent.enddate,
      };
    } else {
      var title = 'New Event'
    }
    return (
      <View 
        style={basicStyles.blank}>
        <NavBar 
          title={title}
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
            value={value}/>
        </ScrollView>
      </View>
    );
  }
}

module.exports = EventCreation;