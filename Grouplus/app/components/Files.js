/**
 * Display uploaded photos and UI for adding new ones.
 */
 var React = require('react-native');
 var ParseReact = require('parse-react/react-native');
 var ParseComponent = ParseReact.Component(React);
 var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
 var Parse = require('parse/react-native');
 Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

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
var {
  DocManager,
} = require('NativeModules');

var Utils = require('./helpers/Utils'); 
var Separator = require('./helpers/Separator');
var AddButton = require('./helpers/AddButton');
var NavBar = require('./helpers/NavBar');
var Utils = require('./helpers/Utils'); 
var windowSize = Dimensions.get('window');
var basicStyles = require('./helpers/Styles');
if (Platform.OS === 'ios') {  
  var ActivityView = require('react-native-activity-view');
}
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
   group: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
  },
   groupOpa: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    opacity: 0.5
  },
  groupDetail: {
    marginVertical: 10,
  },
  groupName: {
    fontSize: 24,
  },
});

class Files extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
     this.state = {
      isEditing: false
    }
  }
  observe(props, state) {
    return {
      fileList: (new Parse.Query('GroupFile')).equalTo('groupId', this.props.group.objectId),
    }
  }
  onPressRow(file) {
    if(this.state.isEditing){
      this.onPressShare(file);
    }else{
      this.props.navigator.push({
      id: 'File',
      uri: file.file.url(),
    });
    }
  }
  OnPressChooseShare(){
    this.setState({isEditing: !this.state.isEditing });
  }
  onPressShare(file){
  if (Platform.OS === 'android') {
    return;
  }
  ActivityView.show({
    text: "File Share",
    url: file.file.url(),
    //imageUrl: imgUrl,
    //image: "Name of the image in the app bundle",
    //exclude: ['postToFlickr'],
    //anchor: React.findNodeHandle(this.refs.share), // Where you want the share popup to point to on iPad
  });
  }
  renderNav(){
    var backIcon, onBackPressed;
    var title = this.props.group === null ? 'Grouplus' : this.props.group.name;
    var right = this.state.isEditing? 'material|close' : 'material|share';
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
        onPressRight={()=>this.OnPressChooseShare()}/>
    );
  }
  openPicker() {
    var that = this;
    DocManager.pickDoc((filename, data) => {
      if (data) {
        var file = new Parse.File(filename, {base64: data});

        var creator = ParseReact.Mutation.Create('GroupFile', {
          groupId: this.props.group.objectId,
          uploadedBy: Parse.User.current().id,
          filename: filename,
        //  description: "test file",
        });

        creator.dispatch().then(function(object){
          var fileItem = Parse.Object.extend("GroupFile");
          var query = new Parse.Query(fileItem);
          query.get(object.objectId, {
            success:function(fileItem){
              fileItem.set('file',file);

              fileItem.save(null, {
                success: function(item) {
                 that.refreshQueries();
                },
                error: function(item, error) {
                  // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
                Utils.alertToast('file upload failed');     
                }
              });
            }
          });          
        });
      } 
    });
  }
  renderSeparator() {
    return (
      <Separator/>
    );
  }
  renderRow(file){
    if (file.file) {
      return (
        <View>
          <TouchableHighlight style={{opacity: this.state.isEditing ? 0.5 : 1}} onPress={() => this.onPressRow(file)} 
                          underlayColor='#EEEEEE'>
            <View style={styles.group}>           
              <View style={styles.groupDetail}>
                <Text style={styles.groupName}> {file.filename} </Text>
              </View>
            </View>
          </TouchableHighlight>      
        </View>
      );
    } else {
      return (
        <View style={styles.group}>           
          <View style={styles.groupDetail}>
            <Text style={styles.groupName}> {file.filename} </Text>
          </View>
        </View>
      );
    }
  }
  render(){
    return (
      <View style={basicStyles.flex1}>
        {this.renderNav()}
         <ListView
          dataSource={this.ds.cloneWithRows(this.data.fileList)}
          renderRow={this.renderRow.bind(this)} 
          renderSeparator={this.renderSeparator.bind(this)}/>
        <AddButton onPress={this.openPicker.bind(this)}/>
      </View>
    );
  }
};

module.exports = Files;