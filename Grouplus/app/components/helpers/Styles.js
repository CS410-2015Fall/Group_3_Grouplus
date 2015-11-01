'use strict';

var StyleSheet = require('react-native').StyleSheet;

module.exports = StyleSheet.create({
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#3399FF',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  buttonText: {
    color: 'white',
    fontSize: 20,
  },  
  flex1: {
    flex: 1,
  },
});