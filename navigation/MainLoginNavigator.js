import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarLogin from '../components/TabBarLogin';
import LoginGoogle from '../screens/LoginGoogle';
import LoginFingerPrint from '../screens/LoginFingerPrint';

const LoginGoogleStack = createStackNavigator({
  Google: LoginGoogle,
}, {
  headerMode: 'none',
});


LoginGoogleStack.navigationOptions = {
  tabBarLabel: 'Google',
  tabBarIcon: ({ focused }) => (
    <TabBarLogin
      focused={focused}
      name={'ios-log-in'}
    />
  ),
};

const LoginFingerPrintStack = createStackNavigator({
  Finger: LoginFingerPrint,
}, {
  headerMode: 'none',
});

LoginFingerPrintStack.navigationOptions = {
  tabBarLabel: 'Scan',
  tabBarIcon: ({ focused }) => (
    <TabBarLogin
      focused={focused}
      name={'md-finger-print'}
    />
  ),
};

export default createMaterialTopTabNavigator({
  Google: { screen: LoginGoogleStack},
  Finger: { screen: LoginFingerPrintStack},
}, {
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: '#efdbf7',
    }
  }
});
 
