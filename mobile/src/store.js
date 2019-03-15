import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { AsyncStorage } from 'react-native'
import appReducer from './reducer'
import reduxThunk from 'redux-thunk'

const init = { message: {}, user: {}, auth: {}, conversation: {}, loading: {} }

const rootReducer = (state, action) => {
  if (action.type === 'LOGIN_OUT') {
    AsyncStorage.removeItem('token')
    Object.keys(state).forEach(key => {
      AsyncStorage.removeItem(`persist:${key}`);
    });
    state = init;
  }

  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistedReducer, init, composeEnhancers(applyMiddleware(reduxThunk)));
export const dispatch = store.dispatch;
export const persistor = persistStore(store)