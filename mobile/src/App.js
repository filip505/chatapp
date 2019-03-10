import React, { Component } from 'react';
import { Text, View, AsyncStorage, Alert } from 'react-native'
import createRootNavigator from './routes'
import { Provider } from 'react-redux'
import Socket from './socket'
import { persistor, store } from './configureStore'
import { PersistGate } from 'redux-persist/es/integration/react'
import OneSignal from 'react-native-onesignal'
import RSAKey from 'react-native-rsa';
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
    OneSignal.init("0596fb61-668e-4d9a-ba3a-3d5a3de4e16a");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure()
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  async onIds(device) {
    await AsyncStorage.setItem('oneSignalId', device.userId)
  }

  async onBeforeLift() {
    const token = await AsyncStorage.getItem('token');
    this.MainNavigator = createRootNavigator(token);
    if (!token) {
      const rsa = new RSAKey();
      rsa.generate(1024, '10001');
      await AsyncStorage.setItem('private_key', rsa.getPrivateString())
      await AsyncStorage.setItem('public_key', rsa.getPublicString())
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