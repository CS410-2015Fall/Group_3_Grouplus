var React = require('react-native');

var {
  View,
  StyleSheet,
  TouchableHighlight,
} = React;

var { Icon } = require('react-native-icons');
var BaseModal = require('react-native-modalbox');

var styles = StyleSheet.create({  
  icon: {
    width: 30,
    height: 30,
  },  
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
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
        style={styles.modal} 
        ref={'modal'}
        isOpen={this.props.isOpen}
        >
        <TouchableHighlight
          onPress={this.close.bind(this)}>
          <Icon 
            name={'material|close'}
            size={32}
            color={'black'}
            styles={styles.icon}/>
        </TouchableHighlight>
        <Component close={this.close.bind(this)}/>
      </BaseModal>
    );
  }
};

module.exports = Modal;