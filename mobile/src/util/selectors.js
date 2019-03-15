

export const createLoadingSelector = actions => state => actions.some(action => state.loading[action]);

export const createErrorMessageSelector = (actions) => (state) => {
  for(action of actions)
    if(state.error[action])
      return state.error[action]
};
