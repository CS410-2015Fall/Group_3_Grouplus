/**
 * Display a list of todo items
 *
 * TODOs: make it swipable 
 */

var React = require('react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
var Parse = require('parse/react-native');
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var {
  View,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  NavigatorIOS,
} = React;

var Modal = require('react-native-modalbox');
var Separator = require('./helpers/Separator');
var GroupAddMember = require('./GroupAddMember');
var UserIcon = require('./UserIcon');
var ParseComponent = ParseReact.Component(React);
var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
  group: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
  },
  groupDetail: {
    marginVertical: 10,
  },
  groupName: {
    fontSize: 24,
  }
});

class GroupAbout extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  }

  observe(props, state) {
    return {
    members : new Parse.Query("User").containedIn("objectId", this.props.group.members),
    }
  }

  onPressAddMember() {
    var that = this;
    this.props.navigator.push({
                   title: 'Add new member',
                   component: GroupAddMember,
                   passProps: {group: that.props.group},
                 });
  }

  renderRow(rowData) {
    console.log("FACE ID : " + rowData.facebookId);
    return (
      <View>
          <View style={styles.group}>
          <UserIcon facebookId={rowData.facebookId}/>
            <View style={styles.groupDetail}>
              <Text style={styles.groupName}> {rowData.name} </Text>
            </View>
          </View>
        <Separator/>
      </View>
    );
  }

  renderFooter() {
    if (this.props.group.createdBy == Parse.User.current().id){
    return (
      <TouchableHighlight style={basicStyles.button}  navigator={this.props.navigator}
          group={this.props.group} onPress={() => this.onPressAddMember()}>
        <Text style={basicStyles.buttonText}>Add New Member</Text>
      </TouchableHighlight>
      );
    }
  }

  render(){
    return (
      <View style={basicStyles.flex1}>
        <ListView
          dataSource={this.ds.cloneWithRows(this.data.members)}
          renderRow={this.renderRow.bind(this)} 
          renderFooter={this.renderFooter.bind(this)}
          contentInset={{top:64, bottom: 50}}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
};

/*
GroupAbout.propTypes = {
  todos: React.PropTypes.array.isRequired,
}*/

module.exports = GroupAbout;