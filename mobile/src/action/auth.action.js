import Axios from 'axios'

export const LOGIN = 'LOGIN'

export const login = (email, password) => {
  const promise = Axios.post('http://localhost:5001/login', { email, password })
  return {
    type: LOGIN,
    payload: promise
  }
}