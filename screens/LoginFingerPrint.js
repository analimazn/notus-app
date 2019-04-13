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
      app = <AppNavigator/>
    } else {
      text = <Text> Tchau </Text>
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={
            Platform.OS === 'android'
              ? this.showAndroidAlert
              : this.scanFingerprint
          }
          style={styles.button}>
          <Text style={styles.buttonText}>SCAN</Text>
        </TouchableOpacity>

        {app}
        {text}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 60,
    backgroundColor: '#056ecf',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 30,
    color: '#fff'   
  }
});