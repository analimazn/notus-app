import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Alert, 
    Platform,
    Button } from 'react-native';

import { Constants, LocalAuthentication } from 'expo';
import AppNavigator from '../navigation/AppNavigator';

export default class LoginFingerPrint extends React.Component {
  state = {
    compatible: false,
    fingerprints: false,
    isFingerPrintTrue: '',
    isLogged: false
  }
  
  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForFingerprints();
  }

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({compatible});
  }
  
  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync()
    this.setState({fingerprints})
  }
  
  scanFingerprint = async () => {
    let isFingerPrintTrue = await LocalAuthentication.authenticateAsync(
      'Scan your finger.'
    );
    this.setState({
      isFingerPrintTrue: JSON.stringify(isFingerPrintTrue.success),
    });
  };
  
  showAndroidAlert = () => {
    Alert.alert(
      'Fingerprint Scan',
      'Place your finger over the touch sensor and press scan.',
      [
        {
          text: 'Scan',
          onPress: () => {
            this.scanFingerprint();
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
      ]
    );
  };
  
  render() {
    const isFingerPrintTrue = this.state.isFingerPrintTrue;
    const isLogged = this.state.isLogged;
    let app;
    let text;

    if (isFingerPrintTrue == 'true') {
      return (
        <View style={styles.container}><AppNavigator /></View>
      );
    }

    return (
      <View style={styles.container}> 
        <View style={styles.button}>
          <Button title="Sign in with your finger" onPress = {
            Platform.OS === 'android'
              ? this.showAndroidAlert
              : this.scanFingerprint
          } />
        </View>
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
  button: {
    width: 200,
    height: 150,
    alignSelf: 'center'
  }
});
