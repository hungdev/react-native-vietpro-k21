import {
  SET_PASSWORD,
  SET_TOKEN,
  SET_ME,
  LOGOUT
} from './actionTypes'

export const setPassword = (pass) => {
  return {
    type: SET_PASSWORD,
    pass
  }
}

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token
  }
}

export const setMe = (user) => {
  return {
    type: SET_ME,
    user
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}