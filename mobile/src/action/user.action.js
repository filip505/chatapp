import { get } from './api'
export const GET_USERS = 'GET_USERS'
export const GET_USER = 'GET_USER'

export const getUser = (id) => get(GET_USER, `/user/${id}`)