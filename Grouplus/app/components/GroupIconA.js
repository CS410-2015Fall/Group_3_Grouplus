/**
 * Make up an icon for a group based on avatar of members
 */

var React = require('react-native');
// TODO: this is super ugly right now !!!!
// Might be better with a letter on circular color
var {
  View,
  Image,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 60,
    justifyContent: 'flex-end',
  },
  avatar: {
    height: 25,
    width: 25,
  },
});

class GroupIcon extends React.Component{
  render(){
    var members = this.props.members;
    var list = members.map((item, index) => {
      return (
        <Image style={styles.avatar} source={{uri: members[index].avatar_url}} />
      ); 
    });
    return (
      <View style={styles.container}>
        {list}
      </View>
    );
  }
};

GroupIcon.propTypes = {
  members: React.PropTypes.array.isRequired,
}

module.exports = GroupIcon;