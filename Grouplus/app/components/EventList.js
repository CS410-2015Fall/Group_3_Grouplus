/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');
var EventItem = require('./EventItem');
var Separator = require('./helpers/Separator');
var EventCreation = require('./EventCreation');
var mockdata = require('../utils/MockData');


var {
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableHighlight,
  NavigatorIOS,
} = React;

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
 buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class EventList extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.events),
    };
  }

  onPressNewEvent() {
    this.props.navigator.push({
      title: 'Add New Event',
      component: EventCreation,
    });
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
        style={styles.button}
        onPress={()=> this.onPressNewEvent()}
        >
          <Text style={styles.buttonText}>Add Events</Text>
        </TouchableHighlight>
      );
  }

  render(){
    return (
      <ListView 
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)} 
        renderFooter={this._renderFooter.bind(this)}
      />
    );
  }
};
EventList.propTypes = {
  events: React.PropTypes.array.isRequired,
}
module.exports = EventList;