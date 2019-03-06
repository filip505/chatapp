import { combineReducers } from 'redux'
import auth from './auth.reducer'
import error from './error.reducer'
import user from './user.reducer'
import message from './message.reducer'
import conversation from './conversation.reducer'

export default combineReducers({
  auth,
  error,
  user,
  message,
  conversation
})