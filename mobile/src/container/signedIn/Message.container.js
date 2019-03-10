import * as React from 'react'
import { Component } from 'react'
import { View, Text, FlatList, TextInput, AppState, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { sendMessage, getMessages } from '../../action/message.action'
import BubbleChatItem from '../../component/bubble.chat.item';
import BubbleComponent from '../../component/bubble.component';
import RSAKey from 'react-native-rsa'
import { getUser } from '../../action/user.action'
import UserHeader from '../../component/user.header.item'
import { resetAction } from '../../routes'

class Dashboard extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = { text: '', appState: AppState.currentState }
    this.RSAKey = new RSAKey()
  }

  componentWillMount() {
    getUser(this.props.userId)
    getMessages(this.props.conversationId)
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      getUser(this.props.userId)
      getMessages(this.props.conversationId)
    }
    this.setState({ appState: nextAppState });
  };

  async encriptAndSendMessage(message, user) {
    const { userId, conversationId } = this.props
    this.RSAKey.setPublicString(user.key)
    var encrypted = this.RSAKey.encrypt(message);
    sendMessage(encrypted, message, userId, conversationId)
  }

  componentWillReceiveProps() {
    const { messages, user } = this.props
    console.log('messages', messages);
  }

  renderMessage(item) {
    const { user } = this.props
    return (
      <BubbleComponent error={item.error} side={item.senderId != user.id}>
        <BubbleChatItem message={item} />
      </BubbleComponent >
    )
  }

  render() {
    const { messages, user } = this.props
    return (
      <View style={{ flex: 1 }}>
        <UserHeader user={user} onPress={() => this.props.navigation.dispatch(resetAction)} />
        <FlatList style={styles.list}
          data={messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))}
          renderItem={({ item }) => this.renderMessage(item)}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.button]}
            onPress={() => this.encriptAndSendMessage(this.state.text, user)}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}> SEND </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder='Type a Message'
            value={this.state.text}
            onChangeText={(text) => { this.setState({ text }) }}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  let { message, user } = state

  const userId = ownProps.navigation.getParam('userId')
  const conversationId = ownProps.navigation.getParam('conversationId')

  const messages = Object.values(message.messages[conversationId] ? message.messages[conversationId] : {}).sort((msg) => msg.createdAt)
  console.log('messages', messages)
  user = user.users[userId]
  return { messages, user, conversationId, userId }
}

export default connect(mapStateToProps)(Dashboard)

const styles = StyleSheet.create({

  list: {
    flex: 1, backgroundColor: '#f2f2f2'
  },
  bottomBar: {
    width: '100%',
    height: 60,
    flexDirection: 'row-reverse'
  },
  input: {
    flex: 1,
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 19
  },
  button: {
    height: 60,
    width: 80,
    borderRadius: 3,
    backgroundColor: '#11B8FF',
    justifyContent: 'center',
    alignItems: 'center'
  }
})