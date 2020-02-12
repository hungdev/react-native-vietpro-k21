import * as actionTypes from '../actions/actionTypes'

const initialAuthState = {
  password: 'hello@cee',
  token: '',
  me: null
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.pass }

    case actionTypes.SET_TOKEN:
      return { ...state, token: action.token }

    case actionTypes.SET_ME:
      return { ...state, me: action.user }

    case actionTypes.LOGOUT:
      return { ...state, token: '', me: '' }

    default:
      return state
  }
}