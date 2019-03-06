import { GET_CONVERSATIONS, SUCCESS_PHASE, CREATE_CONVERSATION } from '../action/api'

export default function (state = null, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      switch (action.payload.phase) {
        case SUCCESS_PHASE:
          return {
            subjects: action.payload.data,
            phase: action.payload.phase
          }
      }
      return { ...state, phase: action.payload.phase }
    case CREATE_CONVERSATION:
      switch (action.payload.phase) {
        case SUCCESS_PHASE:
          return { ...state, phase: action.payload.phase, conversation: action.payload.data }
      }
    default:
      return state
  }
}