import { AsyncStorage } from 'react-native';
import { LOGIN, SUCCESS_PHASE } from '../action/api'

export default function (state = null, action) {
    switch (action.type) {
        case LOGIN:
            switch (action.payload.phase) {
                case SUCCESS_PHASE:
                    const state = action.payload.data
                    AsyncStorage.setItem('token', state.token);
                    console.log('token', state)
                    
                    return {...state, phase: action.payload.phase}
            }
            return state
        default:
            return state
    }
}