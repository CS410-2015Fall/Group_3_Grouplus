/**
 * Display a list of people using using their avatar images
 * Used for showing people who have completed a todo
 */

var React = require('react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
var Parse = require('parse/react-native');
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var {
  View,
  Image,
  StyleSheet,
  Text,
  NetInfo,
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  first: {
    fontSize: 10,
    color: 'orange',
  }
});

class People extends ParseComponent{
  constructor(props){
    super(props);
    this.state = {
      isConnected: false
    };
    // NetInfo.isConnected.fetch().done((connected) => {
    //   this.setState({"isConnected": connected});});
  }
  observe(){
    return {
        completeUsers: new Parse.Query("User").containedIn("objectId", this.props.people),     
      }
  }
  render(){
    var list = this.data.completeUsers.map((item, index) => {
      return(
        <Image style={styles.avatar} source={{uri: item.tempUrl}}/>
        );
    });
    var content = this.state.isConnected? list : <Text style={styles.first}>Open network connection to see who have done! </Text>  ;
    if(list.length === 0  && this.state.isConnected && this.props.people.length == 0){
      content = <Text style={styles.first}>Be the first! </Text>; 
    }
      
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }
};

People.propTypes = {
  people: React.PropTypes.array.isRequired,
}

module.exports = People;