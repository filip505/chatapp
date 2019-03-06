import { get, post, GET_CONVERSATIONS, CREATE_CONVERSATION, STORE_USER, STORE_USERS } from './api'
import { dispatch } from './../configureStore'

export const getConversations = async () => {
  const response = await get(GET_CONVERSATIONS, '/conversation')
  const users = {}
  for (let subject of response.data) {
    users[subject.companion.number] = subject.companion
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