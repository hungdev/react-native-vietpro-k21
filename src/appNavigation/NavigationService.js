import { NavigationActions, StackActions } from 'react-navigation'

let _navigator

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

// with v1: NavigationActions.reset
// with v2: StackActions.reset
function reset(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })]
    })
  )
}

function resetFromTo(PrevRouteName, NextRouterName) {
  _navigator.dispatch(
    StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: PrevRouteName }),
        NavigationActions.navigate({ routeName: NextRouterName })
      ]
    })
  )
}

// add other navigation functions that you need and export them

export default {
  navigate,
  reset,
  resetFromTo,
  setTopLevelNavigator
}