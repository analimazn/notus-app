import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LoginGoogle from '../screens/LoginGoogle';
import LoginFingerPrint from '../screens/LoginFingerPrint';

const LoginGoogleStack = createStackNavigator({
  Google: LoginGoogle,
});

LoginGoogleStack.navigationOptions = {
  tabBarLabel: 'Google',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : '-outline'}`
          : 'md-list'
      }
    />
  ),
};

const LoginFingerPrintStack = createStackNavigator({
  Finger: LoginFingerPrint,
});

LoginFingerPrintStack.navigationOptions = {
  tabBarLabel: 'Scan',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  ),
};

export default createBottomTabNavigator({
  LoginGoogleStack,
  LoginFingerPrintStack
});
