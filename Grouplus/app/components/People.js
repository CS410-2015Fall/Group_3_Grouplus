/**
 * Display a list of people using using their avatar images
 * Used for showing people who have completed a todo
 */

var React = require('react-native');

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

class People extends React.Component{
  render(){
    var people = this.props.people;
    var list = people.map((item, index) => {
      return (
        <Image style={styles.avatar} source={{uri: people[index].avatar_url}} />
      );
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