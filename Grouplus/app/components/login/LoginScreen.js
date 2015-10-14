var React = require('react-native');
var Login = require('./Login');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Image,
} = React;

var styles = StyleSheet.create(require('./styles.js'));

class LoginScreen extends React.Component{
  render() {
    return (
      <Image
        //source={{uri: 'plutoBack.png'}}
        style={styles.loginImage}>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>Images taken from New Horizons Facebook page</Text>
        </View>
        <Login style={styles.loginContainer}/>
      </Image>
    );
  }
}

module.exports = LoginScreen;