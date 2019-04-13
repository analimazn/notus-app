import React, { Component } from 'react';
import {
    Text, 
    View, 
    Image, 
    Button,
    StyleSheet, 
    TouchableOpacity, 
    Alert, 
    Platform } from "react-native";

import { Google } from 'expo';
import { Constants, LocalAuthentication } from 'expo';

import AppNavigator from '../navigation/AppNavigator';
import icon from '../assets/images/icon.png';
import config from '../settings.json';

export default class LoginGoogle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
      compatible: false,
      fingerprints: false,
      result: ""
    }
  }
  
  //Google
  signIn = async () => {
    try {
      const clientId = config.credential_key;
      const { type, accessToken, user } = await Google.logInAsync({
        behavior: "web",
        scopes: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
        clientId: clientId
      })

      if (type === "success") {
        this.setState({
          signedIn: true,
          name: user.name,
          photoUrl: user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  //Fingerprint
  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForFingerprints();
    this.scanFingerprint();
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
    const isFingerPrint = this.state.result;
    const isGoogle = this.state.signedIn;

    let app;
    let text;

    if (isFingerPrint == 'true' || isGoogle) {
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
            <LoginPage signIn={this.signIn} />
        </TouchableOpacity>
        <LoginFinger scanFingerprint={this.scanFingerprint} />

      </View>
    );
  }
}

const LoginPage = props => {
  return (
    <View style={styles.container}> 
      <View style={styles.button}>
        <Button title="Sign in with Google" onPress={() => props.signIn()} />
      </View>
    </View>
  )
}

const LoginFinger = props => {
  return (
    <View style={styles.container}> 
      View style={styles.button}>
        <Button title="Sign in with Google" onPress={() => props.scanFingerprint()} />
      </View>
    </View>
  )
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
  },
  header: {
    fontSize: 25
  }
})