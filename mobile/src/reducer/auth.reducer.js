import { AsyncStorage } from 'react-native';
import { LOGIN, SUCCESS_PHASE } from '../action/api'

export default function (state = null, action) {
    switch (action.type) {
        case LOGIN:
            switch (action.type.phase) {
                case SUCCESS_PHASE:
                    AsyncStorage.setItem('token', action.payload.data.token.id);
            }
            return { ...state, ...action.payload.data, phase: action.payload.phase }
        default:
            return state
    }
}