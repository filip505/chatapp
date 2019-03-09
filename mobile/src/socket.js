import React, { Component } from 'react'
import { AppRegistry, View, AsyncStorage } from 'react-native'
import WS from 'react-native-websocket'
import { connect } from 'react-redux'
import { encryptMessages, storeMessages } from './action/message.action'
// import { RSA } from 'react-native-rsa-native';
import { baseSocketURL } from './env'

class Socket extends Component {

  async decryptMessage(message) {
    console.log('recived message', message)
    const { conversationId } = message
    const messages = await encryptMessages([message])
    storeMessages(messages, conversationId)
  }

  async setPrivateKey() {
    this.privateKey = await AsyncStorage.getItem('private_key')
  }

  componentWillMount() {
    this.setPrivateKey()
  }

  render() {
    const { auth } = this.props
    console.log('auth', auth)
    return (
      <View style={{ flex: 1 }}>
        {auth.token && <WS
          ref={ref => { this.ws = ref }}
          url={baseSocketURL}
          onOpen={async () => {
            this.ws.send(JSON.stringify({ token: await AsyncStorage.getItem('token') }))
          }}
          onMessage={(event) => this.decryptMessage(JSON.parse(event.data))}
          // onError={(event) => console.log('onError', event)}
          // onClose={(event) => console.log('onClose', event)}
          reconnect // Will try to reconnect onClose
        />}
        {this.props.children}
      </View>
    )
  }
}

const mapStateToProps = props => {
  return { auth: props.auth }
}
export default connect(mapStateToProps)(Socket)