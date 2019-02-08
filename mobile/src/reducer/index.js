import { combineReducers } from 'redux'
import auth from './auth.reducer'
import error from './error.reducer'
import users from './user.reducer'

export default combineReducers({
  auth,
  error,
  users
})