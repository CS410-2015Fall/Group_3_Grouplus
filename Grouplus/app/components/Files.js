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

var AddButton = require('./helpers/AddButton');
var NavBar = require('./helpers/NavBar');
var Utils = require('./helpers/Utils'); 
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

class Files extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  }
  observe(props, state) {
    return {
      
    }
  }
  onPressRow(file) {
  }
  renderNav(){
    var backIcon, onBackPressed;
    var title = this.props.group === null ? 'Grouplus' : this.props.group.name;
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
        onPressTitle={()=>this.refreshQueries}
        rightIcon={right} 
        onPressRight={()=>this.OnPressChooseDelete()}/>
    );
  }
  openPicker() {
    DocManager.pickDoc((response) => {
      ;
    });
  }
  renderRow(file){
    return (
      <View/>
    );
  }
  render(){
    return (
      <View style={basicStyles.flex1}>
        {this.renderNav()}
        <AddButton onPress={this.openPicker.bind(this)}/>
      </View>
    );
  }
};

module.exports = Files;