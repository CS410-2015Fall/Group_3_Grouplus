'use strict';

var React = require('react-native');
var t = require('tcomb-form-native');
var { View, TouchableHighlight, Text } = React;
var Form = t.form.Form;

var Group = t.struct({txt: t.Str});

var {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var options = {
    fields: {
        txt: {
            label: 'Add New Group',
            placeholder: 'enter a new group name here',
            autoFocus: true
        }
    }
};

var styles = StyleSheet.create({
    group: {
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

class GroupAdd extends React.Component {
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

    render() {
        return (
            <View style={styles.group}>
                <Form
                    ref="form"
                    type={Group}
                    onChange={this._onChange}
                    options={options}
                    value={this.props.item}/>
                <TouchableHighlight
                    style={[styles.button, styles.saveButton]}
                    onPress={this.onUpdate}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        )
    }
}


module.exports = GroupAdd;