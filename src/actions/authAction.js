import {
  SET_PASSWORD
} from './actionTypes'

export const setPassword = (pass) => {
  return {
    type: SET_PASSWORD,
    pass
  }
}