'use strict';
/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');


var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView
} = React;



var styles = StyleSheet.create({  
    event: {
        marginTop: 10,
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
    TextInput:{
        height: 40, 
        borderColor: 'gray',
        borderWidth: 1
    },
});

class EventCreation extends React.Component{
    constructor() {
        super();
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {

        };
    }

onUpdate() {
    var that = this;
    var creator = ParseReact.Mutation.Create('Event', {
        name: that.state.name,
        createdBy: Parse.User.current().id,
        location: that.state.location,
        groupId: that.props.groupId, 
        dueDate: that.state.startdate,
        enddate: that.state.enddate
    });
        creator.dispatch();
        this.props.close();
    }
  }

  render(){
    return (
            <ScrollView style={styles.event}> 
                <Text style={styles.events}>
                    Enter you event name
                </Text>
                <TextInput
                 style={styles.TextInput}
                 onChangeText={(text) => this.setState({name: text})}
                 value={this.state.name}
                />
                <Text style={styles.events}>
                    Enter you event location
                </Text>
                <TextInput
                 style={styles.TextInput}
                 onChangeText={(text) => this.setState({location: text})}
                 value={this.state.location}
                />
                <Text style={styles.events}>
                    Start Time
                </Text>
                <TextInput
                 style={styles.TextInput}
                 onChangeText={(text) => this.setState({startdate: text})}
                 value={this.state.startdate}
                />
                <Text style={styles.events}>
                    End Time
                 </Text>
                <TextInput
                 style={styles.TextInput}
                 onChangeText={(text) => this.setState({enddate: text})}
                 value={this.state.enddate}
                />               
                <TouchableHighlight
                    style={[styles.button, styles.saveButton]}
                    onPress={this.onUpdate.bind(this)}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
    )
  }
}

module.exports = EventCreation;