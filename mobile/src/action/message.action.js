import { AsyncStorage } from 'react-native'
import { RSA } from 'react-native-rsa-native'
import { dispatch } from './../configureStore'
import { post, get, GET_MESSAGES, STORE_MESSAGES, SEND_MESSAGE } from './api'


export const sendMessage = async (encrypted, text, number, conversationId) => {
  post(SEND_MESSAGE, '/message', { text: encrypted, number, conversationId }, null, text)
}

export const getMessages = async (conversationId) => {
  const res = await get(GET_MESSAGES, `/message/${conversationId}`)
  const messages = await encryptMessages(res.data)
  storeMessages(messages, conversationId)
}

export const encryptMessages = async (messages) => {
  const privateKey = await AsyncStorage.getItem('private_key')
  const messagesObject = {}
  for (let message of messages) {
    message.text = await RSA.decrypt(message.text, privateKey)
    messagesObject[message.id] = message
  }
  return messagesObject
}

export const storeMessages = (messages, conversationId) => {
  console.log('storeMessages')
  dispatch({
    type: STORE_MESSAGES,
    payload: { messages, conversationId }
  })
}