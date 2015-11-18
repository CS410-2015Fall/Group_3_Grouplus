'use strict';
/**
 * Display uploaded photos and UI for adding new ones.
 */
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

class EventCreation extends React.Component{
    constructor() {
        super();
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {
        };
    }

handleClickstartDate() {
       var that=this;
      NativeModules.DateAndroid.showDatepicker(function() {}, function(year,month,day) {
        that.setState({startyear: year})
        that.setState({startmonth: month+1})
        that.setState({startday: day})
        var startd = year.toString()+"/"+(month+1).toString()+"/"+day.toString();
        that.setState({startdate: startd})
      });
    }

handleClickendDate() {
       var that=this;
      NativeModules.DateAndroid.showDatepicker(function() {}, function(year,month,day) {
        that.setState({endyear: year})
        that.setState({endmonth: month+1})
        that.setState({enday: day})
        var endd = year.toString()+"-"+(month+1).toString()+"-"+day.toString();
        that.setState({enddate: endd})
      });
    }

handleClickstartTime() {
       var that=this;
      NativeModules.DateAndroid.showTimepicker(function() {}, function(hour,minute) {
        that.setState({starthour: hour})
        that.setState({startminute: minute})
        var startt=hour.toString()+":"+minute.toString();
        that.setState({starttime: startt})        
      });
    }    

handleClickendTime() {
       var that=this;
      NativeModules.DateAndroid.showTimepicker(function() {}, function(hour,minute) {
        that.setState({endhour: hour})
        that.setState({endminute: minute})
        var endt=hour.toString()+":"+minute.toString();
        that.setState({endtime: endt})  
      });
    }

onUpdate() {
    var that = this;
    var startdatecom=new Date(parseInt(that.state.startyear),(parseInt(that.state.startmonth)-1),parseInt(that.state.startday),parseInt(that.state.starthour),parseInt(that.state.startminute),0);
    var enddatecom=new Date(parseInt(that.state.endyear),(parseInt(that.state.endmonth)-1),parseInt(that.state.enday),parseInt(that.state.endhour),parseInt(that.state.endminute),0);
    var creator = ParseReact.Mutation.Create('Event', {
        name: that.state.name,
        createdBy: "jIZUlILeeI",
        location: that.state.location,
        groupId: that.props.groupId, 
        dueDate: startdatecom,
        enddate: enddatecom,
    });
        creator.dispatch();
      this.props.navigator.pop();
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
                    Start Date
                </Text>
                <View style={styles.container}>
                 <TouchableOpacity onPress={this.handleClickstartDate.bind(this)}>
                  <Text style={styles.instructions}>
                   Select Start Date
                  </Text>            
                 </TouchableOpacity> 
                 <Text>
                   {this.state.startdate}
                 </Text>   
                </View>
              <View style={styles.container}>
                <TouchableOpacity onPress={this.handleClickstartTime.bind(this)}>
                 <Text style={styles.instructions}>
                   Select Start Time
                 </Text>            
                 </TouchableOpacity> 
                <Text>
                   {this.state.starttime}
                 </Text>   
               </View>
               <Text style={styles.events}>
                    End Date
                </Text>
                <View style={styles.container}>
                 <TouchableOpacity onPress={this.handleClickendDate.bind(this)}>
                  <Text style={styles.instructions}>
                   Select End Date
                  </Text>            
                 </TouchableOpacity> 
                 <Text>
                   {this.state.enddate}
                 </Text>   
                </View>
              <View style={styles.container}>
                <TouchableOpacity onPress={this.handleClickendTime.bind(this)}>
                 <Text style={styles.instructions}>
                   Select End Time
                 </Text>            
                 </TouchableOpacity> 
                <Text>
                   {this.state.endtime}
                 </Text>   
               </View>
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