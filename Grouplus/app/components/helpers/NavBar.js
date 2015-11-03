var React = require('react-native');

var {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} = React;

var { Icon } = require('react-native-icons');

var basicStyles = require('./Styles');
var styles = StyleSheet.create({
  statusBar: {
    height: 20,
  },
  navBarContent: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  navBar: {
    height: 64,
    backgroundColor: '#3399FF',
    justifyContent: 'flex-start',
  },
  navTitle: {
    color: 'white', 
    fontSize: 22,
    alignSelf: 'center',
  },
  navTitleWrapper: {
    flex: 6, 
    alignSelf: 'center',
    justifyContent: 'center',
  }, 
  iconWrapper: {
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});

class NavBar extends React.Component{
  renderIcon(icon, onPress, style){
    if (icon) {
      return (
        <TouchableOpacity 
          onPress={onPress}
          style={[styles.iconWrapper]}>
          <Icon 
            name={icon}
            size={32} 
            color={'white'} 
            style={[styles.icon, style]}/>
        </TouchableOpacity> 
      );
    } else {
      return (<View style={basicStyles.flex1}/>);
    }
  }
  renderTitle(title, onPress){
    if (onPress) {
      return (          
        <TouchableOpacity 
          style={basicStyles.navTitleWrapper}
          onPress={onPress}>
          <Text style={styles.navTitle}>{this.props.title}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.navTitleWrapper}>
          <Text style={styles.navTitle}>{this.props.title}</Text>
        </View>
      );
    }
  }
  render(){
    return (
      <View style={styles.navBar}>
        <View style={styles.statusBar}/>   
        <View style={styles.navBarContent}>       
          {this.renderIcon(this.props.leftIcon, 
                           this.props.onPressLeft, 
                           {alignSelf: 'flex-start'})}
          {this.renderTitle(this.props.title, this.props.onPressTitle)}
          {this.renderIcon(this.props.rightIcon, 
                           this.props.onPressRight,
                           {alignSelf: 'flex-end'})}
        </View>
      </View>
    );
  }
};

module.exports = NavBar;