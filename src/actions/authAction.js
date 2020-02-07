import {
  SET_PASSWORD,
  SET_TOKEN
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