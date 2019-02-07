import * as React from 'react'
import { Component } from 'react'
import { View, Text } from 'react-native'

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Dashboard',
    headerLeft: null
  };

  componentDidMount() {
    //this.props.navigation.reset()
  }
  render() {
    return (
      <View>
        <Text>test</Text>
      </View>
    )
  }
}

export default Dashboard