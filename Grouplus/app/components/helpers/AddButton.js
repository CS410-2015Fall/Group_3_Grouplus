/**
 * Used for separating list items
 * This is from egghead.io tutorial
 */

var React = require('react-native');

var {
  View,
  StyleSheet,
  TouchableOpacity,
} = React;

var { Icon } = require('react-native-icons');

var styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F82020',
    position: 'absolute',
    bottom: 15,
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 4,
    shadowColor: '#888888',
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 2},
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});

class AddButton extends React.Component{
  render(){
    return (
      <TouchableOpacity style={styles.button} 
                        onPress={this.props.onPress}>
        <Icon 
          name={'material|plus'}
          size={32} 
          color={'white'} 
          style={styles.icon}/>
      </TouchableOpacity>
    );
  }
};

module.exports = AddButton;