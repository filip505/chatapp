import { get, GET_USER } from './api'

export const getUser = async (userId) => await get(GET_USER, `/user/${userId}`)
