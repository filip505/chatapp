import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { getUser } from '../action/user.action'
export default class AddContact extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '' }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Enter email'
          value={this.state.email}
          autoCapitalize='none'
          onChangeText={(email) => this.setState({ email })}
        />
        <Button title='Confirm' onPress={() => getUser(this.state.email)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { width: 150, height: 60, backgroundColor: '#f0f' }
})