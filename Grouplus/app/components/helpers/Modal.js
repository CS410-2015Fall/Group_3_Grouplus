var React = require('react-native');

var {
  View,
  StyleSheet,
} = React;

var BaseModal = require('react-native-modalbox');

var styles = StyleSheet.create({
});

class Modal extends React.Component{
  close(){
    this.refs.modal.close();
  }
  render(){
    var Component = this.props.component;
    return (
      <BaseModal 
        styles={this.props.styles} 
        ref={'modal'}
        swipeToClose={false}
        >
        <Component close={this.close.bind(this)}/>
      </BaseModal>
    );
  }
};

module.exports = Modal;