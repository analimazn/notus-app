import React, { Component } from 'react';
import {  StyleSheet, 
          Text, 
          View, 
          Image, 
          TouchableOpacity,
          Platform } from "react-native"
import {  createStackNavigator, 
          createAppContainer } from 'react-navigation';

class MainLogoutScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Saindo</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  containerButtons: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'auto',
    justifyContent: 'space-around',
  },
  button: {
    width: 75,
    height: 75,
    alignSelf: 'center',
    padding: 10
  },
  containerText: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 300,
    marginBottom: 200
  },
  text: {
    fontSize: 20,
    color: 'gray',
    padding: 10,
    textAlign: 'center'
  },
})

const LogoutScreen = createStackNavigator({
  Logout: MainLogoutScreen
}, {
  headerMode: 'none'
});

const LogoutContainer = createAppContainer(LogoutScreen);

export default class Login extends React.Component {
  render() {
    return (
      <LogoutContainer />
    )
  }
}