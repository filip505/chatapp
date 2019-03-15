export default (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE|CLEAR)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  if (requestName == 'CLEAR') return state;

  return {
    ...state,
    [requestName]: requestState === 'FAILURE' ? payload : null,
  };
};