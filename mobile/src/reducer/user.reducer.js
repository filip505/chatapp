import { ERROR_PHASE, SUCCESS_PHASE, LOADING_PHASE, STORE_USER, GET_USER, STORE_USERS } from './../action/api'

export default function (state = null, action) {
  switch (action.type) {
    case STORE_USER:
      const { user } = action.payload
      return { ...state, users: { ...state.users, [user.number]: user } }
    case STORE_USERS:
      const { users } = action.payload
      return { ...users }
    case GET_USER:
      const phase = action.payload.phase
      switch (action.payload.phase) {
        case SUCCESS_PHASE:
          const user = action.payload.data
          state.users[user.email] = user
          return { ...state, phase }
        default:
          return { ...state, phase }
      }
    default:
      return state
  }
}
