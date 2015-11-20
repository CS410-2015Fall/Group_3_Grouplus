
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  PushNotificationIOS,
} = React;

var Nav = require('./app/components/Nav');
PushNotificationIOS.requestPermissions();
var registerInstallation = function(data) {
  var url = "https://api.parse.com";
  url += "/1/installations";
  fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'X-Parse-Application-Id': 'ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v',
      'X-Parse-REST-API-Key': '4euJ5DhcI7dqoRRISLO4f1EkR6Bo3ihNjYA9C4zB',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
PushNotificationIOS.addEventListener('register', function(token){
  registerInstallation({
    "deviceType": "ios",
    "deviceToken": token,
    "channels": ["global"]
  })
});
AppRegistry.registerComponent('Grouplus', () => Nav);
