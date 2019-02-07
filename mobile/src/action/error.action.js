export const ERROR = 'ERROR'

export const resetError = (email, password) => {
  return {
    type: ERROR,
    payload: null
  }
}