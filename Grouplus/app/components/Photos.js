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

 var {
  TouchableHighlight,
  StyleSheet,
  ListView,
  Component,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
  AlertIOS,
  Platform,
} = React;

var AddButton = require('./helpers/AddButton');
var NavBar = require('./helpers/NavBar');
var Utils = require('./helpers/Utils'); 

var options = {
  title: 'Upload Photo', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button 
  /*customButtons: {
    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  },*/
  maxWidth: 1000,
  maxHeight: 1000,
  quality: 1,
  allowsEditing: false, // Built in iOS functionality to resize/reposition the image
  storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    path: 'images' // will save image at /Documents/images rather than the root
  }
};
var windowSize = Dimensions.get('window');
var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({  
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  photoListItem: {
    height: windowSize.width/3,
    width: windowSize.width/3,
    borderWidth: 1,
    borderColor: '#fff'
  }, 
  photoListEditItem: {
    height: windowSize.width/3,
    width: windowSize.width/3,
    borderWidth: 1,
    borderColor: '#fff',
    opacity: 0.5
  }, 
});

class Photos extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      isEditing: false
    }
  }
  observe(props, state) {
    return {
      imageList: (new Parse.Query('GroupPhotos')).equalTo('groupId', this.props.group.objectId),
    }
  }
  onPressRow(image) {
    this.props.navigator.push({
      id: 'Photo',
      uri: image.imgFile.url(),
    });
  }
  
  imageOptions() {
    if (Platform.OS === 'android') {
      Utils.alertToast('Stay Tuned; Android support is coming! :)');
      return;
    }
    var that = this;
    UIImagePickerManager.showImagePicker(options, (didCancel, response) => {

      if (didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        var file = new Parse.File('mockphoto7.jpg', {base64: response.data}, 'image/jpeg');

        var creator = ParseReact.Mutation.Create('GroupPhotos', {
          groupId: this.props.group.objectId,
          uploadedBy: Platform.OS === 'ios' ? Parse.User.current().id : "jIZUlILeeI",
          description: "test picture upload",
        });

        creator.dispatch().then(function(object){
          var photoItem = Parse.Object.extend("GroupPhotos");
          var query = new Parse.Query(photoItem);
          query.get(object.objectId, {
            success:function(photoItem){
              photoItem.set('imgFile',file);

              photoItem.save(null, {
               success: function(item) {
                 that.refreshQueries();
               },
               error: function(item, error) {
                  // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              alert('Pictures failed');     
            }
          })
            }
          });          
        });

        this.setState({
          avatarSource: source
        });
      }
    });
  }
  //<Image source={this.state.avatarSource} style={styles.uploadAvatar} />
  OnPressChooseDelete(){
    this.setState({isEditing: !this.state.isEditing });
  }
  onPressDelete(image){
    var target = {
      className: 'GroupPhotos',
      objectId: image.objectId,
    };
    ParseReact.Mutation.Destroy(target).dispatch();
  }
  renderNav(){
    var backIcon, onBackPressed;
    var title = this.props.group === null ? 'Grouplus' : this.props.group.name;
    var right = 'material|delete';
    if(this.state.isEditing){
      right = 'material|close';
    }
    if (Platform.OS === 'ios') {
      backIcon = 'material|chevron-left';
      onBackPressed = this.props.navigator.pop.bind(this);
    } else {
      backIcon = 'material|menu';
      onBackPressed = this.props.openDrawer;
    }
    return (          
      <NavBar
      leftIcon={backIcon}
      onPressLeft={onBackPressed}
      title={title}
      onPressTitle={()=>this.refreshQueries}
      rightIcon={right} 
      onPressRight={()=>this.OnPressChooseDelete()}/>
    );
  }
  renderRow(image){
    if(image.imgFile){
    if(!this.state.isEditing){
      return(
        <TouchableHighlight onPress={() => this.onPressRow(image)}>
        <Image style={styles.photoListItem} source={{uri: image.imgFile.url()}}/>
        </TouchableHighlight>
        );
    }
    else{
      return(
        <TouchableHighlight style={{opacity:0.5}} onPress={() => AlertIOS.alert(
          "",
          "Delete this photo",
          [
          {text: 'Cancel', onPress: () => console.log('Action cancelled')},
          {text: 'Delete', onPress: () => this.onPressDelete(image)},
          ]
          )}>
        <Image style={styles.photoListItem} source={{uri: image.imgFile.url()}}/>
        </TouchableHighlight>
        );
    }
  }
else{
   return(
        <TouchableHighlight>
        <Image style={styles.photoListItem} source={{uri: 'http://files.parsetfss.com/00e842b6-2777-4203-a28f-7407fe7b3df1/tfss-13223ae0-6aeb-44d3-bae2-fad16249e757-loading.jpg'}}/>
        </TouchableHighlight>
        );
}
}

  render(){
    return (
      <View style={basicStyles.flex1}>
      {this.renderNav()}
      <ListView contentContainerStyle={styles.list}
      dataSource={this.ds.cloneWithRows(this.data.imageList)}
      renderRow={this.renderRow.bind(this)}  />
      <AddButton onPress={this.imageOptions.bind(this)}/>
      </View>
      );
  }
};

module.exports = Photos;