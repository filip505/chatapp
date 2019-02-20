import * as React from 'react'
import { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Button, AsyncStorage } from 'react-native'
import UserItem from '../../component/user.item'
import { logout } from '../../action/auth.action'
import { connect } from 'react-redux'
import { ForceTouchGestureHandler, FlatList } from 'react-native-gesture-handler';

class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Message',
    headerLeft: <Button title='logout' onPress={() => { logout(), navigation.navigate('SignedOut') }}></Button>,
    headerRight: <Button title='add Contact' onPress={() => { navigation.navigate('AddContact') }}></Button>
  });

  constructor(props) {
    super(props)
  }

  renderUser(user) {
    return (
      <UserItem
        user={user}
        onPress={() => this.props.navigation.navigate('Message', { id: user.id, name: user.firstName })}
        style={{ height: 100, marginHorizontal: 5, marginTop: 5 }} />
    )
  }

  render() {
    const { users, navigation } = this.props
    console.log('message', Object.values(users))
    return (
      <View style={{ flex: 1 }}>
        <FlatList style={styles.list}
          data={Object.values(users).filter((item) => item != "SUCCESS_PHASE")}
          renderItem={({ item }) => this.renderUser(item)}
          keyExtractor={(item) => item.id}
        />
        {/* {users && Object.values(users).map(value => {
          return (
            <TouchableOpacity
              key={value.id}
              onPress={() => navigation.navigate('Message', { id: value.id })}
            >
              <Text>{value.email}</Text>
            </TouchableOpacity>
          )
        })
        } */}
      </View>
    )
  }
}

const mapStateToProps = (props) => {
  return {
    users: props.users, error: props.error
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  }
})

export default connect(mapStateToProps)(Dashboard)