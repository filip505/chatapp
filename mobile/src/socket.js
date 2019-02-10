import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native'
import WS from 'react-native-websocket'
import { connect } from 'react-redux'
import { storeMessage } from './action/message.action'

class Socket extends Component {

  render() {
    const { auth, storeMessage } = this.props
    return (
      <View style={{ flex: 1 }}>
        {auth && <WS
          ref={ref => { this.ws = ref }}
          url="ws://localhost:1337"
          onOpen={() => {
            this.ws.send(JSON.stringify({ token: auth.token.id }))
          }}
          onMessage={(event) => storeMessage(JSON.parse(event.data), auth.user)}
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
export default connect(mapStateToProps, { storeMessage })(Socket)