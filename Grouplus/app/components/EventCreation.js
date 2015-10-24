/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');
var Separator = require('./helpers/Separator');
var t = require('tcomb-form-native');
var mockdata = require('../utils/MockData');

var Event = t.struct({txt: t.Str});

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} = React;

var Form = t.form.From;

var Event = t.struct({
    name: t.Str, 
    location: t.maybe(t.Str),
    eventstartdate: t.Dat,
    eventfinishdate: t.Dat,
});


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
            label: 'Due date'
        },
        eventfinishdate: {
            label: 'Due date'
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
});

class EventCreation extends React.Component{
    constructor() {
        super();
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate() {
        var value = this.refs.form.getValue();
        if (value) {
            this.props.update(value, this.props.id);
        }
    }


  render(){
    return (
            <View style={styles.event}>          
                <Form
                    ref="form"
                    type={Event}
                    options={options}
                    value={this.props.item}/>
                <TouchableHighlight
                    style={[styles.button, styles.saveButton]}
                    onPress={this.onUpdate.bind(this)}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
    );
  }
};

module.exports = EventCreation;