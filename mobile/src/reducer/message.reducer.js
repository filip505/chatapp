
import { SEND_MESSAGE, STORE_MESSAGE } from './../action/message.action'
import { LOGIN, SUCCESS_PHASE, ERROR_PHASE } from '../action/api'
import { v1 } from 'uuid'
export default function (state = null, action) {
  switch (action.type) {
    case STORE_MESSAGE:
      const obj = action.payload.data
      const { senderId, id } = obj
      delete obj.id
      state[senderId] = state[senderId] ? state[senderId] : {}
      state[senderId] = { ...state[senderId], [id]: obj }
      return { ...state }
    case SEND_MESSAGE:
      switch (action.payload.phase) {
        case LOGIN:
          break;
        case SUCCESS_PHASE: {
          const obj = action.payload.data
          const { recieverId, id } = obj
          delete obj.encrypted
          delete obj.id
          obj.text = action.payload.store
          state[recieverId] = state[recieverId] ? state[recieverId] : {}
          state[recieverId] = { ...state[recieverId], [id]: obj }
          break;
        }
        case ERROR_PHASE: {
          const obj = action.payload.data
          const { recieverId } = obj
          const id = v1()
          delete obj.encrypted
          obj.error = true
          obj.text = action.payload.store
          state[recieverId] = state[recieverId] ? state[recieverId] : {}
          state[recieverId] = { ...state[recieverId], [id]: obj }
          break;
        }
      }
      return { ...state }
    default:
      return state
  }

}

