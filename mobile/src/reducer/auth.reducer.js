import { AsyncStorage } from 'react-native';
import { LOGIN, SUCCESS, OUT } from '../action/api'

export default function (state = null, action) {
    switch (action.type) {
        case LOGIN + SUCCESS:
            const state = action.payload.data
            AsyncStorage.setItem('token', state.token)
            return { ...state }
    }
    return state
}