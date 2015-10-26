'use strict';
/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');
var t = require('tcomb-form-native');
var Form = t.form.Form;

var mockdata = require('../utils/MockData');

var minORhr = t.enums({
     H: 'Hour',
     M: 'Minute'
});

var Event = t.struct({
    name: t.Str, 
    location: t.maybe(t.Str),
    eventstartdate: t.Dat,
    eventDuration: t.Num,
    minORhr: minORhr
});

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView
} = React;




var options = {
    fields: {
        name: {
            label: 'Enter you event name',
            placeholder: 'enter a event name here',
            autoFocus: true
        },
        location: {
            label: 'Eneter your event location',
            placeholder: 'enter location here',
            autoFocus: true
        },
        eventstartdate: {
            label: 'Start Time'
        },
        eventDuration: {
            label: 'Duration'
        },
        minORhr: {
            label: 'Duration in Hour/Minute'
        }

    }
};

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
        this.onUpdate = this.onUpdate.bind(this);
    }

//create new event
    onUpdate() {
        var value = this.refs.form.getValue();
        if (value){
            console.log("test");
        }
    }


  render(){
    return (
            <ScrollView style={styles.event}>          
                <Form
                    ref="form"
                    type={Event}
                    onChange={this._onChange}
                    options={options}
                    value={this.props.item}/>
                <TouchableHighlight
                    style={[styles.button, styles.saveButton]}
                    onPress={this.onUpdate}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
    )
  }
}

module.exports = EventCreation;