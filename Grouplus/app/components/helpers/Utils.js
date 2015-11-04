'use strict';

var React = require('react-native');
var {
  Platform,
  ToastAndroid,
} = React;

var Utils = {
  alert(msg){
    if (Platform === 'ios') {
      alert(msg);
    } else {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  },
}

module.exports = Utils;