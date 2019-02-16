
import { GET_USERS, GET_USER } from './../action/user.action'

export default function (state = null, action) {
  switch (action.type) {
    case GET_USERS:
      let users = []
      for (user of action.payload.data) {
        users[user.id] = user
      }
      console.log('users recived', users)
      return { ...state, ...users }
    case GET_USER:
      const user = action.payload.data
      return { ...state, [user.id]: user }
    default:
      return state
  }
}
