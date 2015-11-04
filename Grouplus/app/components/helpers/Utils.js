'use strict';

var React = require('react-native');
var {
  Platform,
  ToastAndroid,
  AlertIOS,
} = React;

var Utils = {
  alertToast(msg){
    if (Platform.OS === 'ios') {
      alert(msg);
    } else {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  },
}

module.exports = Utils;