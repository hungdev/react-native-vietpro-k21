import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
//Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './src/reducers'

import AppContainer from './src/appNavigation/AppContainer'
import { REHYDRATE, PURGE, persistCombineReducers, persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // or whatever storage you are using
import { PersistGate } from 'redux-persist/es/integration/react';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //sẽ persist
  // whitelist: [                    
  //   'accountReducer'
  // ],
  //ko persist
  blacklist: [
    // 'late'
  ]
}

// let reducer = persistCombineReducers(config, allReducers)
const persistedReducer = persistReducer(persistConfig, allReducers)

export const store = createStore(persistedReducer);
let persistor = persistStore(store)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}