/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');
var ParseReact = require('parse-react/react-native');
var ParseComponent = ParseReact.Component(React);
var Parse = require('parse/react-native');
Parse.initialize("ZPkuU6HLJEjci0haVd3B4SRF91SCREYjI5mx8o2v", "Y0EFXblFv51ypY9nrK3IvJ2FzbTiuQ7OWiU6lQJD");

var Modal = require('react-native-modalbox');
var EventItem = require('./EventItem');
var Separator = require('./helpers/Separator');
var EventAdd = require('./EventAdd');
var mockdata = require('../utils/MockData');


var {
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableHighlight,
} = React;

var basicStyles = require('./helpers/Styles');
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    borderRadius: 4,
    borderWidth: 0.5,
    margin: 3,
      },
  name: {
    fontSize: 18,
  },
});

class Events extends ParseComponent{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    /*
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.events),
    };*/
  }
  observe(props, state) {
    return {
      events: (new Parse.Query('Event')).equalTo('groupId', this.props.group.objectId).ascending('dueDate'),
    }
  }

  onPressNewEvent() {
    this.refs.addEvent.open();
  }

  _renderRow(rowData) {
    return (
      <View stylle={styles.container}>
        <EventItem event={rowData}/>
        <Separator/>
      </View>
    );
  }

  _renderFooter() {
    return (
      <TouchableHighlight 
        style={basicStyles.button}
        onPress={()=> this.onPressNewEvent()}
        >
      <Text style={basicStyles.buttonText}>Add Events</Text>
      </TouchableHighlight>
    );
  }

  render(){
    return (
      <View style={basicStyles.flex1}>
        <ListView 
          dataSource={this.ds.cloneWithRows(this.data.events)}
          renderRow={this._renderRow.bind(this)} 
          renderFooter={this._renderFooter.bind(this)}
          contentInset={{top:64}}
          automaticallyAdjustContentInsets={false}/>
        <Modal ref='addEvent'>
          <EventAdd groupId={this.props.group.objectId} modal={this.refs.addEvent} />
        </Modal>
      </View>
    );
  }
};

Events.propTypes = {
  events: React.PropTypes.array.isRequired,
}

module.exports = Events;