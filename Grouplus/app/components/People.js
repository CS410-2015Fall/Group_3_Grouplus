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
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatar: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  first: {
    fontSize: 10,
    color: 'orange',
  }
});

class People extends ParseComponent{
  observe(){
    return {
        completeUsers: new Parse.Query("User").containedIn("objectId", this.props.people),     
      }
  }
  render(){
   // var people = this.props.people;
    var list = this.data.completeUsers.map((item, index) => {
      return(
       // <Image style={styles.avatar} source={{uri: 'http://graph.facebook.com/{item.authData.facebook.id}/picture?type=small'}}/>
            <Text style={styles.first}>{item.name}</Text>
        );
     // return (
        //<Image style={styles.avatar} source={{uri: people[index].avatar_url}} />
     // );
    });
    var content = (list.length === 0) ? <Text style={styles.first}>Be the first!</Text> : list;

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