import { AsyncStorage } from 'react-native'
import { dispatch } from '../store'
import { post, get, GET_MESSAGES, STORE_MESSAGES, SEND_MESSAGE } from './api'
import RSAKey from 'react-native-rsa'

export const sendMessage = async (encrypted, text, number, conversationId) => {
  post(SEND_MESSAGE, '/message', { text: encrypted, number, conversationId }, null, text)
}

export const getMessages = async (conversationId) => {
  const res = await get(GET_MESSAGES, `/message/conversation/${conversationId}`)
  const messages = await decryptMessages(res.data)

  storeMessages(messages, conversationId)
}

export const decryptMessages = async (messages) => {
  const privateKey = await AsyncStorage.getItem('private_key')
  const rsa = new RSAKey()
  rsa.setPrivateString(privateKey)
  const messagesObject = {}
  
  for (let message of messages) {
    message.text = rsa.decrypt(message.text, privateKey)
    messagesObject[message.id] = message
  }
  return messagesObject
}

export const storeMessages = (messages, conversationId) => {
  dispatch({
    type: STORE_MESSAGES,
    payload: { messages, conversationId }
  })
}