import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import createRootNavigator from './routes'
import reducer from './reducer'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import async from './middleware/async'
import reduxThunk from 'redux-thunk'
import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage'
import Socket from './socket'
import { persistor, store } from './configureStore'
import { RSA, RSAKeychain } from 'react-native-rsa-native';
import { PersistGate } from 'redux-persist/es/integration/react'


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f' }}><Text>Loading</Text></View>
  )
}

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = { gateLifted: false }
  }
  onBeforeLift = () => {
    console.log('onBeforeLift')
    setTimeout(() => {
      this.setState({ gateLifted: true })
    }, 2000);
  }
  render() {
    // RSA.generateKeys(4096) // set key size
    //   .then(keys => {
    //     console.log('4096 private:', keys.private) // the private key
    //     console.log('4096 public:', keys.public) // the public key
    //   })
    console.log('loading')
    const MainNavigator = createRootNavigator();


    const { gateLifted } = this.state
    return (
      //<Provider store={createStoreWithMiddleware(reducer, init, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <Provider store={store}>
        <PersistGate
          onBeforeLift={this.onBeforeLift}
          persistor={persistor}>
          <Socket>
            {gateLifted && <MainNavigator />}
            {!gateLifted && <SplashScreen />}
          </Socket>
        </PersistGate>
      </Provider >
    );

  }
}