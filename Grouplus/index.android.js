/**
 * Entry point to Grouplus
 */
'use strict';

/**
 * This is completely broken right now TODO fix
 */
var React = require('react-native');

var {
  AppRegistry,
} = React;

var Nav = require('./app/components/Nav');
AppRegistry.registerComponent('Grouplus', () => Nav);
