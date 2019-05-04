import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ListAll from '../screens/ListAll';
import NewTask from '../screens/NewTask';
import ListChecked from '../screens/ListChecked';

const ListAllStack = createStackNavigator({
  Home: ListAll,
}, {
  headerMode: 'screen'
});

ListAllStack.navigationOptions = {
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
  Links: NewTask,
}, {
  headerMode: 'screen',
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
  Settings: ListChecked,
}, {
  headerMode: 'screen',
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
  Active: { screen: ListAllStack },
  New: { screen: LinksStack },
  Checked: { screen: SettingsStack },
});
 
