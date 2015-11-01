/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var Parse = require('parse/react-native');
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");
var mockdata = require('../utils/MockData.js');
var item = Parse.Object.extend("GroupPhotos");
var photoItem = new item();
//var query = new Parse.Query(item);



var {
  TouchableHighlight,
  StyleSheet,
  ListView,
  Component,
  Image,
  View,
  Text,
} = React;

var options = {
  title: 'Select Avatar', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  customButtons: {
    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  },
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.5,
  allowsEditing: false, // Built in iOS functionality to resize/reposition the image
  storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    path: 'images' // will save image at /Documents/images rather than the root
  }
};

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({  
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  stub: {
    margin:50,
    fontSize: 45
  },
  list: {
      flexDirection: 'row',
      flexWrap: 'wrap'
  },
  item: {
      margin: 3,
      height: 100,
      width: 100
  }
});

var TestCmp = React.createClass({
  render: function() {
    return (
      <View style={styles.imageContainer}>
        <Image style={basicStyles.flex1}  source={{uri: this.props.uri}}/>
      </View>
    );
  }
});


class Photos extends ParseComponent{

  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.imageOptions = this.imageOptions.bind(this);
  }
  observe(props, state) {
    return {
      imageList: (new Parse.Query('GroupPhotos')).equalTo('groupId', this.props.group.objectId),
    }
  }

  onPressRow(image) {
    this.props.navigator.push({
      title: 'Photo',
      component: TestCmp,
      passProps: {
        uri: image.imgFile.url(),
      },
    });
  }
  imageOptions() {
    var that = this;
    UIImagePickerManager.showImagePicker(options, (didCancel, response) => {

      if (didCancel) {
        console.log('User cancelled image picker');
      } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        var file = new Parse.File('mockphoto7.jpg', {base64: response.data}, 'image/jpeg');
        photoItem.set("description", "test picture upload"); // might need to input description
        console.log(Parse.User.current().id);
        photoItem.set("uploadedBy", Parse.User.current().id);
        photoItem.set("imgFile", file);
        photoItem.set('groupId', this.props.group.objectId);

        photoItem.save(null, {
          success: function(photoItem) {
            // Execute any logic that should take place after the object is saved.
            var added = photoItem.get('imgFile').url();
            alert(added);
            that.refreshQueries();
            //alert('New photo added with objectId: ' + photoItem.imgFile.url());
          },
          error: function(photoItem, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Pictures failed');     
          }
        });

        this.setState({
          avatarSource: source
        });
      }
    });
  }
//<Image source={this.state.avatarSource} style={styles.uploadAvatar} />

  renderFooter(){
    return (
      <TouchableHighlight style={basicStyles.button} onPress={this.imageOptions.bind(this)}>
        <Text style={basicStyles.buttonText}>Take Photo</Text>
      </TouchableHighlight>
    );
  }
  renderRow(image){
    return(
      <TouchableHighlight onPress={() => this.onPressRow(image)}>
        <Image style={styles.item} source={{uri: image.imgFile.url()}}/>
      </TouchableHighlight>
    );
  }

  render(){
    return (
      <ListView contentContainerStyle={styles.list}
        dataSource={this.ds.cloneWithRows(this.data.imageList)}
        renderFooter={this.renderFooter.bind(this)}
        renderRow={this.renderRow.bind(this)} 
        contentInset={{top:64}}
        automaticallyAdjustContentInsets={false}
      />
    );
  }
};

module.exports = Photos;