import { SUCCESS, SEND_MESSAGE, STORE_MESSAGES } from '../action/api'

export default function (state = null, action) {
  switch (action.type) {
    case STORE_MESSAGES: {
      const { messages, conversationId } = action.payload
      console.log('action.payload', action.payload)
      return { ...state, [conversationId]: {...state[conversationId], ...messages}}
    }
    case SEND_MESSAGE + SUCCESS: {
      const obj = action.payload.data
      const { conversationId, id } = obj
      delete obj.encrypted, obj.conversationId
      obj.text = action.payload.store
      return { ...state, [conversationId]: { ...state[conversationId], [id]: obj } }
    }
    default:
      return state
  }

}

