import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import AppLoginGoogle from '../navigation/AppLoginGoogle';
import AppLoginFingerPrint from '../navigation/AppLoginFingerPrint';

export default class Login extends Component {
	render() {
		return (
			<View>
				<AppLoginGoogle />
				<AppLoginFingerPrint />
			</View>
		)
	}
};