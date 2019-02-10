import { AsyncStorage } from 'react-native';
import { LOGIN } from '../action/auth.action'

export default function (state = null, action) {
    switch (action.type) {
        case LOGIN:
            AsyncStorage.setItem('token', action.payload.data.token.id);
            return { ...state, ...action.payload.data, 'error': null }
        default:
            return state
    }
}