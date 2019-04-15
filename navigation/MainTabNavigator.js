import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
  headerMode: 'none'
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Active',
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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
}, {
  headerMode: 'none',
});

LinksStack.navigationOptions = {
  tabBarLabel: 'New',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
}, {
  headerMode: 'none',
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Checked',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'}
    />
  ),
};

export default createBottomTabNavigator({
  Active: { screen: HomeStack },
  New: { screen: LinksStack },
  Checked: { screen: SettingsStack },
});
 
