import { LOADING_PHASE, SUCCESS_PHASE, ERROR_PHASE, SEND_MESSAGE, STORE_MESSAGES, GET_MESSAGES } from '../action/api'
import { v1 } from 'uuid'

export default function (state = null, action) {
  switch (action.type) {
    case STORE_MESSAGES: {
      const { messages, conversationId } = action.payload
      state.messages[conversationId] = { ...state.messages[conversationId], ...messages }
      return { ...state }
    }
    case SEND_MESSAGE:
      switch (action.payload.phase) {
        case SUCCESS_PHASE: {
          const obj = action.payload.data
          const { conversationId, id } = obj
          delete obj.encrypted
          delete obj.conversationId
          obj.text = action.payload.store
          state.messages[conversationId] = { ...state.messages[conversationId], [id]: obj }
          return { ...state }
        }
          //case LOADING_PHASE:
        //break;
        // case ERROR_PHASE: {
        //   const obj = action.payload.data
        //   const { recieverId } = obj
        //   const id = v1()
        //   delete obj.encrypted
        //   obj.error = true
        //   obj.text = action.payload.store
        //   state[recieverId] = state[recieverId] ? state[recieverId] : {}
        //   state[recieverId] = { ...state[recieverId], [id]: obj }
        //   break;
        // }
      }
      return { ...state }
    default:
      return state
  }

}

