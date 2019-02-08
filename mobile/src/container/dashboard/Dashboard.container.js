import * as React from 'react'
import { Component } from 'react'
import { View, Text } from 'react-native'
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
    const { users } = this.props
    console.log('message', this.props)
    return (
      <View style={{ flex: 1 }}>
        {users && Object.values(users).map(value => <Text key={value.id}>{value.email}</Text>)}
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