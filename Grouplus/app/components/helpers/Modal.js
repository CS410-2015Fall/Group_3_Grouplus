var React = require('react-native');

var {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
} = React;

// We are planning to not use modal... but if we do
// we will investigate using RN's offical one
// there's a bug on Android of the offical one as of Nov 1
var { Icon } = require('react-native-icons');
var BaseModal = require('react-native-modalbox');

var styles = StyleSheet.create({  
  icon: {
    width: 30,
    height: 30,
  },  
});

class Modal extends React.Component{
  close(){
    this.refs.modal.close();
  }
  open(){
    this.refs.modal.open();
  }
  render(){
    var Component = this.props.component;
    return (
      <BaseModal 
        ref={'modal'}
        isOpen={this.props.isOpen}
        swipeToClose={false}
        >
        <View>
          <TouchableHighlight
            style={{height: 90}}
            onPress={this.close.bind(this)}>
            <Text style={{fontSize: 100, flexDirection: 'row', selfAlign: 'flex-end'}}>X</Text>
          </TouchableHighlight>
          <Component close={this.close.bind(this)}/>
        </View>
      </BaseModal>
    );
  }
};

module.exports = Modal;