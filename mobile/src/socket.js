import React, { Component } from 'react'
import { AppRegistry, View, AsyncStorage } from 'react-native'
import WS from 'react-native-websocket'
import { connect } from 'react-redux'
import { storeMessage } from './action/message.action'
import { RSA } from 'react-native-rsa-native';

class Socket extends Component {

  async decryptMessage(encodedMessage, user) {
    encodedMessage.text = await RSA.decrypt(encodedMessage.text, this.privateKey)
    storeMessage(encodedMessage, user)
  }
  
  async setPrivateKey() {
    this.privateKey = await AsyncStorage.getItem('private_key')
  }

  render() {
    const { auth } = this.props
    this.setPrivateKey()
    return (
      <View style={{ flex: 1 }}>
        {auth && <WS
          ref={ref => { this.ws = ref }}
          url="ws://localhost:1337"
          onOpen={() => {
            this.ws.send(JSON.stringify({ token: auth.token.id }))
          }}
          onMessage={(event) => this.decryptMessage(JSON.parse(event.data), auth.user)}
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