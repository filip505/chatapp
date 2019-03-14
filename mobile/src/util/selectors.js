export const createLoadingSelector = actions => state =>
  actions.some(action => state.loading[action]);


export const createErrorMessageSelector = (actions) => (state) => {
  return actions.some(action => state.error[action]);
    // .map((action) => _.get(state, `api.error.${action}`))
    // .compact()
    // .first() || '';
};