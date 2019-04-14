import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AppLoginNavigator from '../navigation/AppLoginNavigator';

export default class LoginScreen extends Component {
	render() {
		return (
			<View>
				<AppLoginNavigator />
			</View>
		)
	}
}

const LoginStack = createStackNavigator({
  Login: LoginScreen
}, {
  header: 'none'
});

LoginStack.navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

const LoginContainer = createAppContainer(LoginStack);

export default class Login extends React.Component {
  render() {
    return <LoginContainer />;
  }
}