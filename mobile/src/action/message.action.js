import Axios from 'axios'
import { ERROR } from './error.action';

export const SEND_MESSAGE = 'SEND_MESSAGE'

export const login = (email, password, callback) => async dispatch => {
  try {
    const paylad = await Axios.post('http://localhost:5001/login', { email, password })
    console.log('payload', paylad)
    dispatch({
      type: LOGIN,
      payload: paylad
    })
  } catch (exception) {

    setTimeout(callback, 300)
    const { status, data } = exception.response
    dispatch({
      type: ERROR,
      payload: { status, data }
    })
  }
}
