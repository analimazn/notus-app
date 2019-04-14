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
    result: ''
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
    let result = await LocalAuthentication.authenticateAsync(
      'Scan your finger.'
    );
    this.setState({
      result: JSON.stringify(result.success),
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
    const isLogin = this.state.result;
    let app;
    let text;

    if (isLogin == 'true') {
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
        {text}
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

<View style={styles.container}> 
      <View style={styles.button}>
        <Button title="Sign in with Google" onPress={() => props.signIn()} />
      </View>
    </View>