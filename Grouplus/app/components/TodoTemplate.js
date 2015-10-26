'use strict';

var React = require('react-native');
var t = require('tcomb-form-native');
var Form = t.form.Form;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

//TODO: Change the wording, this is temporary
var Priority = t.enums({
    L: 'Low',
    M: 'Medium',
    H: 'High',
    C: 'Critical'
});

var ToDo = t.struct({
    txt: t.Str, 
    priority: Priority, 
    duedate: t.Dat,
    individual: t.Bool
});

var {
  View,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var options = {
    fields: {
        txt: {
            // TODO: Check if one is the owner, only the owner can change
            label: 'Edit Name',
            placeholder: 'enter a new group name here',
            autoFocus: true
        },
        priority: {
            label: 'Priority'
        },
        duedate: {
            label: 'Due date'
        }
    }
};

var styles = StyleSheet.create({
    todo: {
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

class TodoTemplate extends React.Component {
    constructor() {
        super();
        this.onUpdate = this.onUpdate.bind(this);
    }

onUpdate() {
        var value = this.refs.form.getValue();

        if (value) {
          var creator = ParseReact.Mutation.Create('Todo', {
            name: value.txt,
            createdBy: Parse.User.current().id,
            //TODO: show only groups that we added so far
            //group: this.props.group.id,
            dueDate: value.duedate,
            priority: value.priority,
            individual: value.individual,
            done: false,
        });
            creator.dispatch();
        }
    }
    

    render() {
         console.log("group ID : " + this.props.group);
        return (

            <ScrollView automaticallyAdjustContentInsets={false}
            style={styles.todo}>

                <Form
                    ref="form"
                    type={ToDo}
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


module.exports = TodoTemplate;