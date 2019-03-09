import Axios from 'axios'
import { dispatch } from './../configureStore'
import { post, LOGIN } from './api'

export const login = (email, password, key, oneSignalId) => {
  console.log('bla', oneSignalId)
  post(LOGIN, '/auth/login', { email, password, key, oneSignalId})
}


export const logout = () => {
  dispatch({
    type: 'USER_LOGOUT',
    payload: null
  })
}