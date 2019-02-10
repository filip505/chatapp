import * as React from 'react'
import { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import WS from 'react-native-websocket'
import { getUsers } from './../../action/user.action'
import { connect } from 'react-redux'
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Message',
    headerLeft: null
  };

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    this.props.getUsers(() => { })
  }
  render() {
    const { users, navigation } = this.props
    console.log('message', this.props)
    return (
      <View style={{ flex: 1 }}>
        {users && Object.values(users).map(value => {
          return (
            <TouchableOpacity
              key={value.id}
              onPress={()=> navigation.navigate('Message', {id: value.id})}
            >
              <Text>{value.email}</Text>
            </TouchableOpacity>
          )
        })
        }
      </View>
    )
  }
}

const mapStateToProps = (props) => {
  return {
    users: props.users, error: props.error
  }
}

export default connect(mapStateToProps, { getUsers })(Dashboard)