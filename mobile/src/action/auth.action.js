import Axios from 'axios'
import { dispatch } from './../configureStore'
import { post } from './api'
export const LOGIN = 'LOGIN'

export const login = async (email, password, key) => {
  await post(LOGIN, '/login', { email, password, key})
}

export const logout = () => {
  dispatch({
    type: 'USER_LOGOUT',
    payload: null
  })
}