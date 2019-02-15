import Axios from 'axios'
import { dispatch } from './../configureStore'
export const LOGIN = 'LOGIN'

export const login = async (email, password, key, callback) => {
  try {
    console.log('payload')
    const paylad = await Axios.post('http://localhost:5001/login', { email, password, key })
    console.log('payload', paylad)
    dispatch({
      type: LOGIN,
      payload: paylad
    })
  } catch (error) {
    console.log('error', error)
    setTimeout(callback, 300)
    const { status, data } = error.response
    dispatch({
      type: 'ERROR',
      payload: { status, data }
    })
  }
}

export const logout = () => {
  dispatch({
    type: 'USER_LOGOUT',
    payload: null
  })
}