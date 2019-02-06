import { AsyncStorage } from 'react-native';
import { LOGIN } from '../action/auth.action'

export default function (state = null, action) {
    switch (action.type) {
        case LOGIN:
            return loginHandler(state, action)
        default:
            return state
    }
}

const loginHandler = function (state, action) {
    const { payload } = action
    console.log('response', action.payload)
    if (payload.status) {
        AsyncStorage.setItem('token', action.payload.data.token.id);
        return { ...state, 'user': action.payload.data.user }
    } else {
        console.log('FAIL')
    }
    return state
}