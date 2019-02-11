import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from './reducer'
import reduxThunk from 'redux-thunk'
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
}

const init = { message: {} }

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// //let store = createStoreWithMiddleware(persistedReducer, init, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// let persistor = persistStore(store)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composedEnhancers = composeWithDevTools(
//   applyMiddleware(reduxThunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default () => {
  const store = createStore(persistedReducer, init, composeEnhancers( applyMiddleware(reduxThunk)));
  return { store, persistor: persistStore(store) };
};