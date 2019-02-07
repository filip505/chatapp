import { AsyncStorage } from 'react-native';
import { LOGIN } from '../action/auth.action'

export default function (state = null, action) {
    switch (action.type) {
        case LOGIN:
            console.log('LOGIN', action.payload)
            return loginHandler(state, action)
        default:
            return state
    }
}

const loginHandler = function (state, action) {
    const { payload } = action
   
    if (payload.status) {
        AsyncStorage.setItem('token', action.payload.data.token.id);
        return { ...state, 'user': action.payload.data.user, 'error': null }
    } else {
        console.log('FAIL')
    }
    return state
}