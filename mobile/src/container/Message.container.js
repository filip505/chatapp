import * as React from 'react'
import { Component } from 'react'
import { View, Text } from 'react-native'
import WS from 'react-native-websocket'
import { AsyncStorage } from 'react-native'
import { getUsers } from './../action/user.action'
import { connect } from 'react-redux'

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Dashboard',
    headerLeft: null
  };

  constructor(props){
    super(props)
  }

  async componentDidMount() {
    //this.props.navigation.reset()
    const token = await AsyncStorage.getItem('token');
   
    this.state = {token}
    console.log('token', JSON.stringify({token: this.state.token}))
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WS
          ref={ref => { this.ws = ref }}
          url="ws://localhost:1337"
          onOpen={() => {
            this.ws.send(JSON.stringify({token: this.state.token}))
          }}
          onMessage={console.log}
          onError={console.log}
          onClose={console.log}
          reconnect // Will try to reconnect onClose
        />
      </View>
    )
  }
}

export default connect()(Dashboard)