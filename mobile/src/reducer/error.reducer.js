
export default function (state = null, action) {
  switch (action.type) {
    case 'ERROR':
      console.log('error recived', action)
      const payload = action.payloa
      return { ...state, ...action.payload }
    default:
      return state
  }
}
