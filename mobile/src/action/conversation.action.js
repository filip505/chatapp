import { get, post, GET_CONVERSATIONS, CREATE_CONVERSATION, STORE_CONVERSATION, STORE_USER, STORE_USERS } from './api'
import { dispatch } from '../store'

export const getConversations = async () => {
  const response = await get(GET_CONVERSATIONS, '/conversation')
  const users = {}
  for (let conversation of response.data) {
    users[conversation.companion.number] = conversation.companion
  }
  dispatch({
    type: STORE_USERS,
    payload: { users }
  })
}

export const createConversation = async (number, callback) => {
  const response = await post(CREATE_CONVERSATION, `/conversation/${number}`)
  dispatch({
    type: STORE_USER,
    payload: { user: response.data.companion }
  })
  callback(response.data.id, response.data.companion.id)
}

export const storeConversation = async (conversation) => {
  dispatch({
    type: STORE_CONVERSATION,
    payload: conversation
  })
}