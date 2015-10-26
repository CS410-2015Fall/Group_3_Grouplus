/**
 * Used for separating list items
 */

var React = require('react-native');

var {
  View,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
  },
});

class Separator extends React.Component{
  render(){
    return (
      <View style={[styles.separator, this.props.style]} />
    );
  }
};

module.exports = Separator;