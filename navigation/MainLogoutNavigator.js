import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Logout from '../screens/Logout';

const LogoutStack = createStackNavigator({
  Login: Logout,
}, {
  headerMode: 'none',
});


LogoutStack.navigationOptions = {
  tabBarLabel: 'Logout',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-log-in'}
    />
  ),
};

export default createMaterialTopTabNavigator({
  Logout: { screen: LogoutStack}
}, {
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: '#efdbf7',
    }
  }
});
 
