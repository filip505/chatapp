import { get, GET_USER, GET_MESSAGES } from './api'
import { AsyncStorage } from 'react-native'

export const getUser = async (userId) => await get(GET_USER, `/user/${userId}`)
