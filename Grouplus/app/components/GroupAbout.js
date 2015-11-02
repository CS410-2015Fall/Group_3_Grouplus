/**
 * Display a list of todo items
 *
 * TODOs: make it swipable 
 */

var React = require('react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
var Parse = require('parse/react-native');
Parse.initialize("***REMOVED***", "***REMOVED***");

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

class GroupAbout extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

  }
  // observe(props, state) {
  //   return {
  //     members: this.props.group.members
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({dataSource: this.ds.cloneWithRows(/*nextProps.todos*/ this.data.members)});
  // }
  
  onPressAddMember() {
    this.refs.addMember.open();
  }

  renderRow(rowData) {
    //var color = colors[rowID % colors.length];
    return (
      <View>
        <TouchableHighlight onPress={() => this.onPressRow(rowData)} 
                        navigator={this.props.navigator}
                        underlayColor='#E6FFFF'>
          <View style={styles.group}>
            <View style={styles.groupDetail}>
              <Text style={styles.groupName}> {rowData.name} </Text>
            </View>
          </View>
        </TouchableHighlight>
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
          dataSource={this.ds.cloneWithRows(this.props.group.members)}
          renderRow={this.renderRow.bind(this)} 
          renderFooter={this.renderFooter.bind(this)}
          contentInset={{top:64, bottom: 50}}
          automaticallyAdjustContentInsets={false}
        />
        <Modal ref='addMember'>
          <GroupAddMember groupId={this.props.group.id} modal={this.refs.addMember} />
        </Modal>
      </View>
    );
  }
};

/*
GroupAbout.propTypes = {
  todos: React.PropTypes.array.isRequired,
}*/

module.exports = GroupAbout;