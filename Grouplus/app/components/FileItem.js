/**
 * Display a single todo item with title and duedate
 * showing avatars of people who completed the tasks
 */

var React = require('react-native');
var {
  Text,
  View,
  StyleSheet,
  WebView,
  TouchableWithoutFeedback,
  Platform,
} = React;
var basicStyles = require('./helpers/Styles');
if (Platform.OS === 'ios') {  
  var ActivityView = require('react-native-activity-view');
}
var WEBVIEW_REF = 'webview';
var NavBar = require('./helpers/NavBar');

var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#3b5998'
  },
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
  },
});

class FileItem extends React.Component{
_pressHandler(fileUrl){
  if (Platform.OS === 'android') {
    return;
  }
  ActivityView.show({
    text: "File Share",
    url: fileUrl,
    //imageUrl: imgUrl,
    //image: "Name of the image in the app bundle",
    //exclude: ['postToFlickr'],
    //anchor: React.findNodeHandle(this.refs.share), // Where you want the share popup to point to on iPad
  });
  }
 renderNav(){
    var backIcon, onBackPressed;
    var title = "file";
    var right = 'material|delete';
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
        onPressTitle={()=>this.refreshQueries}/>
    );
  }

  render(){
    return (
      
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          url={this.props.fileUrl}
          javaScriptEnabledAndroid={true}
          scalesPageToFit={true}/>
       
    );
  }
};

FileItem.propTypes = {
  fileUrl: React.PropTypes.object.isRequired,
}

module.exports = FileItem;