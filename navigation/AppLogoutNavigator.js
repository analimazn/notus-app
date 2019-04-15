import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainLogoutNavigator from './MainLogoutNavigator';

export default createAppContainer(createStackNavigator({
    Main: { screen: MainLogoutNavigator },
  }, {
    headerMode: 'none'
  }
));

