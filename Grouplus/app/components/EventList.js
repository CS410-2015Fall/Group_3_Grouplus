/**
 * Display uploaded photos and UI for adding new ones.
 */
var React = require('react-native');
var EventItem = require('./EventItem');
var Separator = require('./helpers/Separator');

var {
  StyleSheet,
  View,
  ListView,
  Text,
} = React;

var styles = StyleSheet.create({  
});

class EventList extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.events),
    };
  }
  _renderRow(rowData) {
    return (
      <View>
        <EventItem event={rowData}/>
        <Separator/>
      </View>
    );
  }
  render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)} 
      />
    );
  }
};
EventList.propTypes = {
  events: React.PropTypes.array.isRequired,
}
module.exports = EventList;