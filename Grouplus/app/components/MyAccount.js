/**
 * Display a list of people using using their avatar images
 * Used for showing people who have completed a todo
 */

var React = require('react-native');
var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKGraphRequest,
  FBSDKGraphRequestManager,
} = FBSDKCore;

var {
  View,
  Image,
  StyleSheet,
    ListView,
  Text,
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatar: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  first: {
    fontSize: 10,
    color: 'orange',
  }
});

class MyAccount extends React.Component{
  render(){
    return (
<ListView
       // dataSource={this.state}
        //renderRow={this._renderRow.bind(this)} 
      />
    );
  }
};

MyAccount.propTypes = {
  myaccount: React.PropTypes.array.isRequired,
}

module.exports = MyAccount;