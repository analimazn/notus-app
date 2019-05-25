import React from 'react'
import {  Platform, 
          StatusBar, 
          StyleSheet, 
          View, 
          Text, 
          Image, 
          Button  } from 'react-native'
import { AppLoading, Asset, Font, Icon } from 'expo'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from './screens/Login'
import AppNavigator from './navigation/AppNavigator'

class MainScreen extends React.Component {

  static navigationOptions = {
    title: 'N O T U S',
    headerStyle: {
      backgroundColor: '#FFF'
    },
    headerTintColor: '#403e41'
  }

  state = {
    isLoadingComplete: false
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Login />
        </View>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ])
  }

  _handleLoadingError = error => {
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    alignItems: 'center'
  }
})

const AppScreen = createStackNavigator({
  App: MainScreen
}, {
  headerMode: 'screen'
})

const AppContainer = createAppContainer(AppScreen)

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}