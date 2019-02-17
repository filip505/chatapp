
import { GET_USER } from './../action/user.action'
import { ERROR_PHASE, SUCCESS_PHASE, LOADING_PHASE } from './../action/api'

export default function (state = null, action) {
  switch (action.type) {
    // case GET_USERS:
    //   let users = []
    //   for (user of action.payload.data) {
    //     users[user.id] = user
    //   }
    //   console.log('users recived', users)
    //   return { ...state, ...users }
    case GET_USER:
      const phase = action.payload.phase
      switch (action.payload.phase) {
        case SUCCESS_PHASE:
          const user = action.payload.data
          return { ...state, [user.id]: user, phase}
        default:
          return { ...state, phase }
      }

    default:
      return state
  }
}
