import * as React from 'react'
import { Component } from 'react'
import { View, Text, FlatList, TextInput } from 'react-native'
import { AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { sendMessage } from '../../action/message.action'
import BubbleChatItem from '../../component/bubble.chat.item';
import BubbleComponent from '../../component/bubble.component';
import { RSA } from 'react-native-rsa-native'

class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name'),
    }
  };

  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  componentWillMount() {

  }

  async componentDidMount() {
    //this.props.navigation.reset()
    const token = await AsyncStorage.getItem('token');
    this.state = { token }
  }

  async encriptAndSendMessage(message, user) {
    const encrypted = await RSA.encrypt(message, user.key)
    if (user.key) {
      sendMessage(encrypted, message, user)
    }
  }

  renderMessage(item) {
    const { auth } = this.props
    console.log(item.senderId + ' '+ auth.user.id, item.senderId == auth.user.id)
    return (
      <BubbleComponent error={item.error} side={item.senderId == auth.user.id}>
        <BubbleChatItem message={item} />
      </BubbleComponent >
    )
  }

  render() {
    const { message, user, auth } = this.props
    return (
      <View style={{ flex: 1 }}>
        <FlatList style={styles.list}
          data={Object.values(message)}
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
            value={this.state.message}
            onChangeText={(text) => { this.setState({ text }) }}
          />

        </View>
      </View>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  console.log('mapStateToProps', state.message)
  const { error, message, auth, users } = state
  const id = ownProps.navigation.getParam('id')
  return { error, message: message[id] ? message[id] : {}, user: users[id], auth }
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