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
  Image,
} = React;

var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKGraphRequest,
} = FBSDKCore;

var ImageWidth = 150;

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

class UserIcon extends React.Component{

constructor() {
    super();
//     console.log("USER ICON FB : " + this.props.facebookId);
// var that = this;
// var fetchProfile = new FBSDKGraphRequest((error, result) => {
//   if (error) {
//     alert('Error making request.');
//   } else {
//     console.log("GOT THE PHOTO : " + result + result.source);
//     this.setState({ profile: result });
//   }
// }, '/'+ this.props.facebookId +'/picture');
// // Start the graph request.
// fetchProfile.start();

    // // Make a graph request to get photos
    // var feedRequest = new FBSDKGraphRequest(
    //   this._handleRequest.bind(this),
    //   '/'+{this.props.facebookId}+'/picture',
    // );
    // feedRequest.start();
  }


  render() {
    console.log("USER ICON FB : " + this.props.user.tempUrl);
    return (
          <Image
          style={[styles.circle]}
          source={{uri: this.props.user.tempUrl}}
          />
    );
  }
};

UserIcon.propTypes = {
  user: React.PropTypes.object.isRequired,
}

module.exports = UserIcon;