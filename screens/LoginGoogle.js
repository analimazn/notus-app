import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from "react-native"

import { Google } from 'expo';
import { Constants, LocalAuthentication } from 'expo';

import AppNavigator from '../navigation/AppNavigator';
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

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
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
      <View style={styles.button}>
        <Button title="Sign in with Google" onPress={() => props.signIn()} />
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
  }
})