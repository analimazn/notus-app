import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello World</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
})

