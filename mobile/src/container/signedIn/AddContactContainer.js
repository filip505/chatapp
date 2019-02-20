import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput, ScrollView, FlatList } from 'react-native-gesture-handler';
import { getUser } from '../../action/user.action'
export default class AddContact extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '' }
  }

  render() {
    return (
      <View style={styles.container}>
    
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder='Enter email'
          value={this.state.email}
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={(email) => this.setState({ email })}
        />
        <Button style={styles.button} title='Confirm' onPress={() => getUser(this.state.email)} />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ECF0F3',
    paddingHorizontal: 19
  },
  button: {
    height: 60,
    borderRadius: 3,
    backgroundColor: '#11B8FF',
    justifyContent: 'center',
    alignItems: 'center'
  }
})