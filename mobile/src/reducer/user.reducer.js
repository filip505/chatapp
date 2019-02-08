
import { GET_USERS } from './../action/user.action'

export default function (state = null, action) {
  switch (action.type) {
    case GET_USERS:
 
      let users = []
      for(user of action.payload.data){
        users[user.id] = user
      }
      console.log('users recived', users)
      return { ...state, ...users }
    default:
      return state
  }
}
