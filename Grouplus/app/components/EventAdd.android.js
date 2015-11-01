'use strict';
/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');

var mockdata = require('../utils/MockData');





var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView
} = React;






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



  render(){
    return (
            <ScrollView style={styles.event}>          
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