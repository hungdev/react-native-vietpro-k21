import React from 'react'

import { Button, View, Text, BackHandler, Alert } from 'react-native'

import NavigationService from './NavigationService'
import TopLevelNavigator from './Router'

export default class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLeftDrawerOpened: false,
      isRightDrawerOpened: false
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    // Alert.alert('Bạn có chắc thoát ứng dụng không?')
    return true;
  }

  render() {
    return (
      <TopLevelNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    )
  }
}