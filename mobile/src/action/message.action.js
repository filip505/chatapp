import Axios from 'axios'
import { dispatch } from './../configureStore'
import { AsyncStorage } from 'react-native'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const STORE_MESSAGE = 'STORE_MESSAGE'

export const sendMessage = async (text, { id }, callback) => {
  try {
    console.log('sending', text)
    const token = await AsyncStorage.getItem('token');
    const paylad = await Axios.post('http://localhost:5001/message', { text, recieverId: id }, {
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
    console.log('exception', exception)
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
  dispatch({
    type: STORE_MESSAGE,
    payload: obj
  })
}