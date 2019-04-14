import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainLoginNavigator from './MainLoginNavigator';

export default createAppContainer(createStackNavigator({
    Main: { screen: MainLoginNavigator },
  }, {
    headerMode: 'screen',
    title: 'New task',
    headerStyle: {
      backgroundColor: '#d98880'
    },
    headerTintColor: '#d98880'
  })
);
