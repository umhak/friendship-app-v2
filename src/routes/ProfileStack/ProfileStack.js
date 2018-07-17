import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProfileScreen from '../../containers/ProfileScreen';

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTransparent: true,
    },
  },
});

export default ProfileStack;
