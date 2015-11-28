'use strict';

var React = require('react-native');
var {
  Platform,
  ToastAndroid,
  AlertIOS,
} = React;

var {
  CalendarManager
} = require('NativeModules');
var {CalendarModule} = require('NativeModules');

var Utils = {
  alertToast(msg){
    if (Platform.OS === 'ios') {
      alert(msg);
    } else {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  },

  export(event){
       if (Platform.OS === 'ios') {
        CalendarManager.addEvent(event.name, event.location, event.eventstartdate.getTime(), event.eventenddate.getTime(), 
          (response) =>{
            if(response){
              alert("Export Successful!");
            }else{
              alert("Export Event Failed. Please check event date format or access to calcendar!");
            }
          });
        } else {
          CalendarModule.addEvent(event.name, event.location, event.dueDate.getTime().toString(), event.enddate.getTime().toString());
        }    
  }
}

module.exports = Utils;