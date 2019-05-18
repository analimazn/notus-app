import googleIcon from "../assets/images/google.png";
import fingerPrint from "../assets/images/fingerprint.png";

import React, { Component } from 'react';
import {  StyleSheet, 
          Text, 
          View, 
          Image, 
          Button,
          TouchableOpacity,
          Alert,
          Platform } from "react-native"

import {  Google, 
          Constants, 
          LocalAuthentication } from 'expo';
import TabBarIcon from '../components/TabBarIcon';

import AppNavigator from '../navigation/AppNavigator';
import Config from '../settings.json';

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      compatible: false,
      fingerprints: false,
      isFingerPrintTrue: '',
      signedIn: '',
      name: '',
      photoUrl: '',
      compatible: false,
      fingerprints: false,
      result: ''
    }
  }
  
  //Google
  signInWithGoogle = async () => {
    try {
      const clientId = Config.credential_key;
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
          signedIn: 'true',
          name: user.name,
          photoUrl: user.photoUrl
        })
      } else {
        console.log("cancelled")
      }

    let isFingerPrintTrue = await LocalAuthentication.authenticateAsync(
      'Scan your finger.'
    );
    this.setState({
      signedIn: JSON.stringify(isFingerPrintTrue.success),
    });

    } catch (e) {
      console.log("error", e)
    }
  }

  scanFingerPrint = async () => {
    let isFingerPrintTrue = await LocalAuthentication.authenticateAsync(
      'Scan your finger.'
    );
    this.setState({
      signedIn: JSON.stringify(isFingerPrintTrue.success),
    });
  }

  signIn = async (item) => {
    try {
      if(item == 'google') {
        await this.signInWithGoogle();
      } else if (item == 'finger') {
        await this.showAndroidAlert();
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  //FingerPrint
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
  
  showAndroidAlert = () => {
    Alert.alert(
      'Fingerprint Scan',
      'Place your finger over the touch sensor and press scan.',
      [
        {
          text: 'Scan',
          onPress: () => {
            this.scanFingerPrint();
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
    return (
      <View style={styles.container}>
        {this.state.signedIn == 'true' ? (
          <AppNavigator />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    );
  }
}

const LoginPage = props => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.text}>Choose your Google account or Fingerprint to Login</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          onPress = {() => {
            props.signIn('google');
          }}>
          <Image
            style={styles.button}
            source={googleIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {() => {
            props.signIn('finger');
          }}>
          <Image
            style={styles.button}
            source={fingerPrint}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default class Login extends React.Component {
  render() {
    return (
      <LoginScreen />
    )
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