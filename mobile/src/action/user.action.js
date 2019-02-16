import Axios from 'axios'
import { AsyncStorage } from 'react-native'
import { dispatch } from './../configureStore'

export const GET_USERS = 'GET_USERS'
export const GET_USER = 'GET_USER'

export const getUsers = (callback) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    const paylad = await Axios.get('http://localhost:5001/user', {
      headers: { token }
    })
    dispatch({
      type: GET_USERS,
      payload: paylad
    })
  } catch (exception) {
    console.log('exception', exception)
    setTimeout(callback, 300)
    const { status, data } = exception.response
    dispatch({
      type: ERROR,
      payload: { status, data }
    })
  }
}

export const getUser = async function (id) {
  console.log('action', `http://localhost:5001/user/${id}`)
  const token = await AsyncStorage.getItem('token');
  const paylad = await Axios.get(`http://localhost:5001/user/${id}`, {
    headers: { token }
  })
  console.log('action', paylad)
  dispatch({
    type: GET_USER,
    payload: paylad
  })
}

