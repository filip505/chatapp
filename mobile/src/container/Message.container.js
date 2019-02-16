import * as React from 'react'
import { Component } from 'react'
import { View, Text, FlatList, TextInput } from 'react-native'
import WS from 'react-native-websocket'
import { AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native'
import { getUsers } from './../action/user.action'
import { connect } from 'react-redux'
import { sendMessage } from './../action/message.action'
import BubbleChatItem from '../component/bubble.chat.item';
import BubbleComponent from '../component/bubble.component';

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Message',
  };

  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  componentWillMount() {

  }

  renderMessage(item) {
    const { auth } = this.props
    console.log('tu', item.senderId == auth.user.id)
    return (
      <BubbleComponent side={item.senderId == auth.user.id}>
        <BubbleChatItem message={item} />
      </BubbleComponent >
    )
  }

  async componentDidMount() {
    //this.props.navigation.reset()
    const token = await AsyncStorage.getItem('token');
    this.state = { token }
  }

  render() {
    const { message, user, auth } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
        <FlatList style={styles.list}
          data={message}
          // renderItem={({ item }) => <BubbleComponent ><BubbleChatItem message={item}/></BubbleComponent>}
          renderItem={({ item }) => this.renderMessage(item)}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.button]}
            onPress={() => sendMessage(this.state.text, user)}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}> SEND </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder='Type a Message'
            value={this.state.message}
            onChangeText={(text) => { this.setState({ text }) }}
          />

        </View>
      </View>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  const { error, message, auth, users} = state
  const id = ownProps.navigation.getParam('id')
  return { error, message: message[id] ? message[id].slice() : [], user: users[id], auth }
}

export default connect(mapStateToProps)(Dashboard)

const styles = StyleSheet.create({

  list: {
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