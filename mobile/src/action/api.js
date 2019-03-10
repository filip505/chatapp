import Axios from 'axios'
import { dispatch } from './../configureStore'
import { AsyncStorage } from 'react-native'
import { baseURL } from './../env'

export const LOGIN = 'LOGIN'
export const LOADING_PHASE = 'LOADING_PHASE'
export const GET_CONVERSATIONS = 'GET_CONVERSATIONS'
export const SUCCESS_PHASE = 'SUCCESS_PHASE'
export const ERROR_PHASE = 'ERROR_PHASE'
export const CREATE_CONVERSATION = 'CREATE_CONVERSATION'
export const STORE_USER = 'STORE_USER'
export const GET_USER = 'GET_USER'
export const GET_MESSAGES = 'GET_MESSAGES'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const STORE_MESSAGES = 'STORE_MESSAGES'
export const STORE_USERS = 'STORE_USERS'
export const DECRYPT_MESSAGES = 'DECRYPT_MESSAGES'
export const STORE_CONVERSATION = 'STORE_CONVERSATION'

async function call(type, method, config, store) {
  console.log('request made', type)
  dispatch({ type: type, payload: { phase: LOADING_PHASE } })
  const headers = (config) ? config.headers : {}
  const request = {
    ...config,
    timeout: 10000,
    method,
    baseURL,
    headers: { ...headers, token: await AsyncStorage.getItem('token') }
  }
  try {
    let payload = await Axios.request(request)
    payload.phase = SUCCESS_PHASE
    payload.store = store
    dispatch({
      type,
      payload
    })
    return payload
  } catch (exception) {
    console.log('exception', exception)
    dispatch({
      type,
      payload: { phase: ERROR_PHASE, data: request.data, store }
    })
  }
}

export const get = async (type, url, headers, store) => await call(type, 'get', { url, headers }, store)
export const post = async (type, url, data, headers, store) => await call(type, 'post', { url, data, headers }, store)