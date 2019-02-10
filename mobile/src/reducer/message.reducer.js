
import { SEND_MESSAGE, STORE_MESSAGE } from './../action/message.action'

export default function (state = null, action) {
  switch (action.type) {
    case STORE_MESSAGE:
      const obj = action.payload
      state[obj.id] = state[obj.id] ? state[obj.id] : []
      state[obj.id].push(obj.message)
      return { ...state }
    default:
      return state
  }

}

