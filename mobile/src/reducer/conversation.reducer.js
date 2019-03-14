import { GET_CONVERSATIONS, STORE_CONVERSATION, SUCCESS_PHASE, CREATE_CONVERSATION } from '../action/api'

export default function (state = null, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      switch (action.payload.phase) {
        case SUCCESS_PHASE:
          const conversations = {}
          action.payload.data.forEach(conversation => {
            conversation.companionId = conversation.companion.number
            conversations[conversation.id] = conversation
          });
          return { ...conversations }
      }
      return { ...state, phase: action.payload.phase }
    case CREATE_CONVERSATION:
      switch (action.payload.phase) {
        case SUCCESS_PHASE:
          return { ...state, phase: action.payload.phase, conversation: action.payload.data }
      }
    case STORE_CONVERSATION:
      const conversation = action.payload
      return { ...state, [conversation.id]: conversation }
    default:
      return state
  }
}