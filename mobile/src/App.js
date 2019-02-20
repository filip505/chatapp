import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import createRootNavigator from './routes'
import { Provider } from 'react-redux'
import Socket from './socket'
import { persistor, store } from './configureStore'
import { PersistGate } from 'redux-persist/es/integration/react'
import { RSA } from 'react-native-rsa-native';
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

  componentWillMount() {
    //this.token = await AsyncStorage.getItem('token');
    // console.log('token', this.token)
    // this.MainNavigator = createRootNavigator(false);
  }

  async onBeforeLift() {
    const token = await AsyncStorage.getItem('token');
    this.MainNavigator = createRootNavigator(token);
    if (!token) {
      console.log('stvaram nove tokene')
      const keys = await RSA.generateKeys(4096)
      await AsyncStorage.setItem('private_key', keys.private)
      await AsyncStorage.setItem('public_key', keys.public)
    }
    this.setState({ gateLifted: true })
  }

  renderMainNavigator() {
    const MainNavigator = this.MainNavigator
    return <MainNavigator />
  }

  render() {
    const { gateLifted } = this.state
    return (
      //<View style={{ flex: 1, backgroundColor: '#f0f' }}><Text>odasdasdask</Text></View>
      <Provider store={store}>
        <PersistGate
          onBeforeLift={() => this.onBeforeLift()}
          persistor={persistor}>
          {gateLifted && (
            <Socket>
              {this.renderMainNavigator()}
            </Socket>
          )}
          {!gateLifted && <SplashScreen />}
        </PersistGate>
      </Provider >
    );

  }
}