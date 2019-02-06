import * as React from 'react'
import { Component } from 'react'
import { View, Text } from 'react-native'
import spinnerHocComponent from '../../component/spinner.hoc.component';

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Dashboard',
  };
  render() {
    return (
      <View>
        <Text>test</Text>
      </View>
    )
  }
}

export default spinnerHocComponent(Dashboard)