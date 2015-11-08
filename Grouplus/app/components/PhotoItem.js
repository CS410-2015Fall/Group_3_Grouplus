/**
 * Display a single todo item with title and duedate
 * showing avatars of people who completed the tasks
 */

var React = require('react-native');
var basicStyles = require('./helpers/Styles');
var ActivityView = require('react-native-activity-view');

var {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} = React;

var styles = StyleSheet.create({
   imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  }
});

class PhotoItem extends React.Component{
_pressHandler(imgUrl){
    ActivityView.show({
  text: "Text you want to share",
  //url: "URL you want to share",
  imageUrl: imgUrl,
  //image: "Name of the image in the app bundle",
  //exclude: ['postToFlickr'],
  //anchor: React.findNodeHandle(this.refs.share), // Where you want the share popup to point to on iPad
    });
  }

  render(){
    return (
  <View style={styles.imageContainer}>
     <TouchableWithoutFeedback
          onLongPress={() => this._pressHandler(this.props.photoUrl)}>
          <Image style={basicStyles.flex1} source={{uri: this.props.photoUrl}}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
};

PhotoItem.propTypes = {
  photoUrl: React.PropTypes.object.isRequired,
}

module.exports = PhotoItem;