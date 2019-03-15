import Axios from 'axios'
import { dispatch } from '../store'
import { post, LOGIN, OUT } from './api'

export const login = (email, password, key, oneSignalId) => {
  post(LOGIN, '/auth/login', { email, password, key, oneSignalId })
}

export const logout = () => dispatch({ type: LOGIN + '_OUT' })