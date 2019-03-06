import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput, ScrollView, FlatList } from 'react-native-gesture-handler';
import { createConversation } from '../../action/conversation.action'
import { connect } from 'react-redux';
import { isSuccess } from '../../util/actionPhaseUtil'
class AddContact extends Component {

  constructor(props) {
    super(props)
    this.state = { number: '' }
  }

  componentWillReceiveProps(newProps) {
    // if (newProps.users[this.state.email] &&  this.props.conversation) {
    //   newProps.navigation.navigate('Message', { id: this.state.email, conversationId: this.props.conversation.id })
    // }
  }

  conversationCreatedHandler(conversationId) {
    if (!this._calledComponentWillUnmount) {
      console.log(this.state, 'props')
      this.props.navigation.navigate('Message', { userId: this.state.number, conversationId })
    }
  }

  render() {
    const { number } = this.state
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder='Enter Number'
          value={number}
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={(number) => this.setState({ number })}
        />
        <Button style={styles.button} title='Confirm' onPress={() => createConversation(number, (id) => this.conversationCreatedHandler(id))} />

      </View>
    )
  }
}

const mapStateToProps = ({ user, conversation }) => {
  console.log('mapStateToProps', conversation.conversation)
  return { users: user.users, conversation: conversation.conversation }
}

export default connect(mapStateToProps)(AddContact)

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