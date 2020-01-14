import * as React from 'react';
import { Button, View, Text, Platform, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import HomeScreen from '../screens/Home'
import ProfileScreen from '../screens/Profile'
import SignInScreen from '../screens/Login'
import SignUpScreen from '../screens/Register'
import PostScreen from '../screens/Post'
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
import { Metrics } from '../themes';

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  Post: PostScreen,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    //https://reactnavigation.org/docs/en/stack-navigator.html
    headerBackground: (
      <Image
        style={{
          width: '100%',
          height: Metrics.navBarHeight,
        }}
        resizeMode="stretch"
        source={require('../assets/header_background.png')}
      />
    ),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: Platform.OS == 'android' ? 26 : 24,
    },
  }
});
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
}, {
  initialRouteName: 'SignUp',
}
);

export default createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    }
  )
);