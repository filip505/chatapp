import { ERROR_PHASE, SUCCESS_PHASE, LOADING_PHASE, STORE_USER, GET_USER, STORE_USERS } from './../action/api'

export default function (state = null, action) {
  switch (action.type) {
    // case GET_USERS:
    //   let users = []
    //   for (user of action.payload.data) {
    //     users[user.id] = user
    //   }
    //   console.log('users recived', users)
    //   return { ...state, ...users }
    case STORE_USER:
      const { user } = action.payload
      return { ...state, users: { ...state.users, [user.number]: user } }
    case STORE_USERS:
      const { users } = action.payload
      console.log('tu', action.payload)
      return { ...state, users: { ...state.users, ...users } }
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
