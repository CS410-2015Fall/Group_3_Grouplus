'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");


var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  NativeModules,
} = React;

var NavBar = require('./helpers/NavBar');
var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({  
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 70,
        margin: 3,
        justifyContent: 'space-between',
    },
    instructions: {
        flex: 15,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
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


class TodoAdd extends React.Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
   if(this.props.todo) {
    console.log(this.props.todo);
    console.log(this.props.todo.dueDate.getDate());
    this.state = {
      name: this.props.todo.name,
      priority: this.props.todo.priority,
      duedatecom: this.props.todo.dueDate,
      individual: this.props.todo.individual,
      dueyear: this.props.todo.dueDate.getFullYear(),
      duemonth: this.props.todo.dueDate.getMonth(),
      dueday: this.props.todo.dueDate.getDate(),
      duehour: this.props.todo.dueDate.getHours(),
      dueminute: this.props.todo.dueDate.getMinutes(),
      duedate: this.props.todo.dueDate.getFullYear().toString()+"/"+(this.props.todo.dueDate.getMonth()+1).toString()+"/"+this.props.todo.dueDate.getDate().toString(),
      duetime: this.props.todo.dueDate.getHours().toString()+":"+this.props.todo.dueDate.getMinutes().toString()
    };
  }
  else this.state={};
  }

  handleClickdueDate() {
       var that=this;
      NativeModules.DateAndroid.showDatepicker(function() {}, function(year,month,day) {
        that.setState({dueyear: year})
        that.setState({duemonth: month+1})
        that.setState({dueday: day})
        var dued = year.toString()+"/"+(month+1).toString()+"/"+day.toString();
        that.setState({duedate: dued})
      });
    }

  handleClickdueTime() {
       var that=this;
      NativeModules.DateAndroid.showTimepicker(function() {}, function(hour,minute) {
        that.setState({duehour: hour})
        that.setState({dueminute: minute})
        var duet=hour.toString()+":"+minute.toString();
        that.setState({duetime: duet})        
      });
    }

  onUpdate() {
    var that = this;
    if (that) {
      if(this.props.todo) {
        var target = {
          className: 'Todo',
          objectId: that.props.todo.objectId,
        };  
        var isDone = false;
        // if(value.individual === true) {
        //   if(this.props.todo.whoAreDone.includes(Parse.User.current().id)) {
        //     var isDone = true;
        //   }
        // }    
        var duedatecom=new Date(parseInt(that.state.dueyear),(parseInt(that.state.duemonth)-1),parseInt(that.state.dueday),parseInt(that.state.duehour),parseInt(that.state.dueminute),0);
        var creator = ParseReact.Mutation.Set(target, {
            name: that.state.name,
            dueDate: duedatecom,
            //priority: value.priority,
            //individual: value.individual,
            //done: isDone,
        }); 
        } else {
        var duedatecom=new Date(parseInt(that.state.dueyear),(parseInt(that.state.duemonth)-1),parseInt(that.state.dueday),parseInt(that.state.duehour),parseInt(that.state.dueminute),0);
        var creator = ParseReact.Mutation.Create('Todo', {
            name: that.state.name,
            createdBy: Parse.User.current().id,
            group: that.props.group,
            dueDate: duedatecom,
            // priority: value.priority,
            // individual: value.individual,
            done: false,
            whoAreDone: [],
          });
      }     
    creator.dispatch();
    this.props.refresh();
    this.props.navigator.pop();
    }
  }
  

  render() {
    var that=this;
    if(this.props.status === 'edit') {
      var title = 'Edit Todo';
      var value=this.props.todo.name;
        //priority: this.props.todo.priority,
        //duedate: this.props.todo.duedate,
    } else {
      var title = 'Add Todo'
    }
    
    return (
      <View 
        style={basicStyles.blank}>
        <NavBar 
          title={title}
          leftIcon={'material|close'} 
          onPressLeft={()=>this.props.navigator.pop()}
          rightIcon={'material|check'} 
          onPressRight={this.onUpdate.bind(this)}/>
        <ScrollView style={styles.event}> 
                <Text style={styles.events}>
                    Enter you Todo title
                </Text>
                <TextInput
                 style={styles.TextInput}
                 onChangeText={(text) => this.setState({name: text})}
                 value={this.state.name}
                />
                
                <Text style={styles.events}>
                    Due Date
                </Text>
                <View style={styles.container}>
                 <TouchableOpacity onPress={this.handleClickdueDate.bind(this)}>
                  <Text style={styles.instructions}>
                   Select Due Date
                  </Text>            
                 </TouchableOpacity> 
                 <Text>
                   {this.state.duedate}
                 </Text>   
                </View>
              <View style={styles.container}>
                <TouchableOpacity onPress={this.handleClickdueTime.bind(this)}>
                 <Text style={styles.instructions}>
                   Select Due Time
                 </Text>            
                 </TouchableOpacity> 
                <Text>
                   {this.state.duetime}
                 </Text>   
               </View>
                <TouchableHighlight
                    style={[styles.button, styles.saveButton]}
                    onPress={this.onUpdate.bind(this)}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
      </View>
    )
  }
}


module.exports = TodoAdd;