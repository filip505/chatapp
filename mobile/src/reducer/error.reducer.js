
export default function (state = null, action) {
  switch (action.type) {
    case 'ERROR':
      console.log('error recived', action)
      return action.payload
    default:
      return state
  }
}
