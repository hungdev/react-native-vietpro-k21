import * as React from 'react';
import { Button, View, Text, Platform, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Home'
import ProfileScreen from '../screens/Profile'
import SignInScreen from '../screens/Login'
import SignUpScreen from '../screens/Register'
import PostScreen from '../screens/Post'
import FriendsScreen from '../screens/Friends'
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
import { Metrics } from '../themes';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  // Details: DetailsScreen,
  Post: PostScreen,
},
  {
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
  }
);

const AppTab = createBottomTabNavigator({
  Home: HomeStack,
  Friends: FriendsScreen,
  Profile: ProfileScreen,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused
            ? 'ios-home'
            : 'md-home';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Profile') {
          iconName = focused ? 'ios-contact' : 'md-contact';
        } else if (routeName === 'Friends') {
          iconName = focused ? 'ios-contacts' : 'md-contacts';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
}, {
  initialRouteName: 'SignIn',
}
);

export default createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoading: AuthLoadingScreen,
      App: AppTab,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    }
  )
);