/**
 * Make up an icon for a group based on group name
 */

var React = require('react-native');
// TODO: this is super ugly right now !!!!
// Might be better with a letter on circular color
var {
  View,
  Text,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 30,
    opacity: 30,
    color: 'white',
  },
});

class GroupIcon extends React.Component{
  render() {
    return (
      <View style={[styles.circle, {backgroundColor: this.props.color}]}>
        <Text style={styles.text}>{this.props.letter}</Text>
      </View>
    );
  }
};

GroupIcon.propTypes = {
  color: React.PropTypes.array.isRequired,
  letter: React.PropTypes.string.isRequired,
}

module.exports = GroupIcon;