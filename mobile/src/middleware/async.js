export default ({ dispatch }) => next => action => {
  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  action.payload.then((response) => {
    const newAction = { ...action, payload: response }
    dispatch(newAction)
  }).catch((response) => {
    const { status, data } = response.response
    const newAction = { type: 'ERROR', payload: {status, data} }
    dispatch(newAction)
  })
}