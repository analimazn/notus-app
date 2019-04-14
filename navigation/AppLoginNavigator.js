import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainLoginNavigator from './MainLoginNavigator';

export default createAppContainer(createStackNavigator({
  Main: MainLoginNavigator,
}));