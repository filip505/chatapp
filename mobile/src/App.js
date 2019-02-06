import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import MainNavigator from './routes'
import { createStore } from 'redux'
import reducer from './reducer'
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux'
import promise from 'redux-promise'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export default class App extends Component {
  render() {

    return (
      <Provider store={createStoreWithMiddleware(reducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <MainNavigator />
      </Provider>
    );

  }
}