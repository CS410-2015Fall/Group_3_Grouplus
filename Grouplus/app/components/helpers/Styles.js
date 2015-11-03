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
  blank: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  swipeout: {
    backgroundColor: '#dbddde',
    flex: 1,
    overflow: 'hidden',
  },
  swipeoutBtnTouchable: {
    flex: 1,
  },
  swipeoutBtn: {
    alignItems: 'center',
    backgroundColor: '#b6bec0',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  swipeoutBtnText: {
    color: '#fff',
    textAlign: 'center',
  },
  swipeoutBtns: {
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  swipeoutContent: {
    flex: 1,
  },
  colorDelete: {
    backgroundColor: '#fb3d38',
  },
  colorPrimary: {
    backgroundColor: '#006fff',
  },
  colorSecondary: {
    backgroundColor: '#fd9427',
  },
  form: {
    padding: 20,
  },
});