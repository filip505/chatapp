import * as React from 'react'
import { Component } from 'react'
import { View, StyleSheet, Text, Button, AppState } from 'react-native'
import UserItem from '../../component/user.item'
import { logout } from '../../action/auth.action'
import { getConversations } from '../../action/conversation.action'
import { connect } from 'react-redux'
import { ForceTouchGestureHandler, FlatList } from 'react-native-gesture-handler';
import { isLoading, isSuccess } from '../../util/actionPhaseUtil'

class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Message',
    headerLeft: <Button title='logout' onPress={() => { logout(), navigation.navigate('SignedOut') }}></Button>,
    headerRight: <Button title='add Contact' onPress={() => { navigation.navigate('AddContact') }}></Button>
  });

  constructor(props) {
    super(props)
    state = {
      appState: AppState.currentState,
    };
  }

  componentWillMount() {
    getConversations()
  }

  componentDidMount() {
    AppState.addEventListener('change', () => this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', () => this._handleAppStateChange);
  }

  _handleAppStateChange(nextAppState){
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      getConversations()
    }
    this.setState({appState: nextAppState});
  };

  renderConversation(subject) {
    return (
        <UserItem
          subject={subject}
          onPress={()=>this.props.navigation.navigate('Message', {userId: subject.companion.number, conversationId: subject.conversation.id})}
          style={{ height: 100, marginHorizontal: 5, marginTop: 5 }} />
    )
  }

  render() {
    // const { conversation } = this.props
    const { phase, subjects } = this.props.conversation
    return (
      <View style={{ flex: 1 }}>
        {isLoading(phase) && <Text>Loading</Text>}
        {isSuccess(phase) &&
          <FlatList style={styles.list}
            data={subjects}
            renderItem={({ item }) => this.renderConversation(item)}
            keyExtractor={(subject) => subject.conversationId}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = ({ conversation }) => {
  return { conversation }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  }
})

export default connect(mapStateToProps)(Dashboard)