import Axios from 'axios'
import { dispatch } from './../configureStore'

const baseURL = 'http://192.168.178.53:5001'
const token = 'token'
export const LOGIN = 'LOGIN'
export const LOADING_PHASE = 'LOADING_PHASE'
export const SUCCESS_PHASE = 'SUCCESS_PHASE'
export const ERROR_PHASE = 'ERROR_PHASE'

async function call(type, method, config) {
  console.log('call ide')
  dispatch({ type: type, payload: { phase: LOADING_PHASE } })
  const headers = (config) ? config.headers : {}
  const request = {
    ...config,
    method,
    baseURL,
    headers: { ...headers, token }
  }
  try {
    let payload = await Axios.request(request)
    payload.phase = SUCCESS_PHASE
    dispatch({
      type,
      payload
    })
  } catch (exception) {
    console.log('exception', exception)
    console.log('request', request)
    if (exception.response) {
      const { status, data } = exception.response
      dispatch({
        type,
        payload: { phase: ERROR_PHASE }
      })
    }
  }
}

export const get = async (type, url, headers) => await call(type, 'get', { url, headers })
export const post = async (type, url, data, headers) => await call(type, 'post', { url, data, headers })