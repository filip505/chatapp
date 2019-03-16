import { GET_CONVERSATIONS, SUCCESS, STORE_CONVERSATION, GET_MESSAGES } from '../action/api'

export default function (state = null, action) {
  switch (action.type) {
    case GET_CONVERSATIONS + SUCCESS:
      const conversations = {}
      action.payload.data.forEach(conversation => {
        conversation.companionId = conversation.companion.number
        conversations[conversation.id] = conversation
      });
      return { ...conversations }
    case GET_MESSAGES + SUCCESS: {
      const { conversationId } = action.payload.data[0]
      if(!conversationId) return state
      return { ...state, [conversationId]: { ...state[conversationId], messageCount: 0 } }
    }
    // case GET_CONVERSATIONS:
    //   switch (action.payload.phase) {
    //     case SUCCESS_PHASE:
    //       const conversations = {}
    //       action.payload.data.forEach(conversation => {
    //         conversation.companionId = conversation.companion.number
    //         conversations[conversation.id] = conversation
    //       });
    //       return { ...conversations }
    //   }
    //   return { ...state, phase: action.payload.phase }
    // case CREATE_CONVERSATION:
    //   switch (action.payload.phase) {
    //     case SUCCESS_PHASE:
    //       return { ...state, phase: action.payload.phase, conversation: action.payload.data }
    //   }
    case STORE_CONVERSATION:
      console.log('STORE_CONVERSATION')
      const conversation = action.payload
      return { ...state, [conversation.id]: conversation }
    default:
      return state
  }
}