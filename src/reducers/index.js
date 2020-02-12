// reducers/index.js

import { combineReducers } from 'redux'
import auth from './authReducer'

const rootReducer = combineReducers({
  auth,
  // feed
})

export default rootReducer