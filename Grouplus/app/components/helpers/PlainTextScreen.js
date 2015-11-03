var React = require('react-native');

var {
  View,
  StyleSheet,
  Text,
} = React;

var styles = StyleSheet.create({
  textScreen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#FF9966',
  },
  textScreenText: {
    fontSize: 20,
    color: 'white',
    opacity: 50,
    padding: 10,
  },  
});

class PlainTextScreen extends React.Component{
  render(){
    return (
      <View style={styles.textScreen}>
        <Text style={styles.textScreenText}>{this.props.text}</Text>
      </View>
    );
  }
};

module.exports = PlainTextScreen;