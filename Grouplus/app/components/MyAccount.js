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

var Name;

// Create a graph request asking for friends with a callback to handle the response.
 var fetchFriends = new FBSDKGraphRequest((error, result) => {
    if (error)
    {
      console.log("->FBHelper.getFriends Error: ", error);
      fail(error);
    }
    else
    {
        console.log("->FBHelper.getFriends Result: ", result);
    }
  }, '/me/friends?fields=id,name,picture' 
  );

  //fetchFriends.start(); //works before 0.10
  FBSDKGraphRequestManager.batchRequests([fetchFriends], function() {}, 60); // works for 0.10 and later


var profileRequest = new FBSDKGraphRequest((error, result) => {
  if (error) {
    alert('Error making request.');
  } else {
    console.log(result);
      Name = result.name;
  }
}, '/me');

  FBSDKGraphRequestManager.batchRequests([profileRequest], function() {}, 60); // works for 0.10 and later


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
        dataSource={this.state}
        //renderRow={this._renderRow.bind(this)} 
      />
    );
  }
};

MyAccount.propTypes = {
  myaccount: React.PropTypes.array.isRequired,
}

module.exports = MyAccount;