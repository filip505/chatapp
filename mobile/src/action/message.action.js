import Axios from 'axios'
import { AsyncStorage } from 'react-native'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const STORE_MESSAGE = 'STORE_MESSAGE'

export const sendMessage = (text, recieverId, callback) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(text, recieverId)
    const paylad = await Axios.post('http://localhost:5001/message', { text, recieverId }, {
      headers: {
        token
      }
    })
    console.log('payload', paylad)
    dispatch({
      type: SEND_MESSAGE,
      payload: paylad
    })
  } catch (exception) {
    if (callback) setTimeout(callback, 300)
    const { status, data } = exception.response
    dispatch({
      type: 'ERROR',
      payload: { status, data }
    })
  }
}

export const storeMessage = (message, auth) => {
  const { recieverId, senderId } = message
  const obj = { message }
  obj.id = senderId == auth.id ? recieverId : senderId
  return {
    type: STORE_MESSAGE,
    payload: obj
  }
}