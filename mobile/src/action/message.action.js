import { dispatch } from './../configureStore'
import { post } from './api'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const STORE_MESSAGE = 'STORE_MESSAGE'

export const sendMessage = async (encrypted, text, { id }, callback) => {
  post(SEND_MESSAGE, '/message', { text: encrypted, recieverId: id }, {}, text)
  // try {
  //   console.log('sending', text)
  //   const token = await AsyncStorage.getItem('token');
  //   const paylad = await Axios.post('http://192.168.178.53:5001/message', { text, recieverId: id }, {
  //     headers: {
  //       token
  //     }
  //   })
  //   console.log('payload', paylad)
  //   dispatch({
  //     type: SEND_MESSAGE,
  //     payload: paylad
  //   })
  // } catch (exception) {
  //   if (callback) setTimeout(callback, 300)
  //   console.log('exception', exception)
  //   const { status, data } = exception.response
  //   dispatch({
  //     type: 'ERROR',
  //     payload: { status, data }
  //   })
  // }
}

export const storeMessage = (message) => {
  dispatch({
    type: STORE_MESSAGE,
    payload: {data: message}
  })
}