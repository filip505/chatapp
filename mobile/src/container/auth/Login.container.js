import * as React from 'react'
import { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import SpinnerHocComponent from '../../component/spinner.hoc';
import DismissKeyboardHoc from '../../component/dismissKeyboard.hoc'
import { connect } from 'react-redux'
import { login } from './../../action/auth.action'

class LoginContainer extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      logging: false,
      username: 'test@test.com',
      password: 'test'
    }
  }

  componentWillReceiveProps(props) {
    if (props.auth) {
      props.navigation.navigate('Dashboard')
    }
  }

  login = () => {
    Keyboard.dismiss()
    this.setState({ logging: true });
    const { username, password } = this.state
    this.props.login(username, password, () => this.setState({ logging: false }))
  }

  render() {
    const { username, password, error } = this.props
    return (
      <SpinnerHocComponent
        spinner={this.state.logging}
        style={styles.container}
      >
        <DismissKeyboardHoc>
          <View style={styles.container}>
            <TextInput
              style={[styles.textInput, { marginTop: 40 }]}
              placeholder="Username"
              value={username}
              autoCapitalize='none'
              onChangeText={username => { this.setState({ 'username': username }) }}
            />
            <TextInput
              placeholder="Password"
              style={[styles.textInput, { marginVertical: 20 }]}
              value={password}
              autoCapitalize='none'
              onChangeText={(password) => this.setState({ 'password': password })}
            />
            <TouchableOpacity style={[styles.button]}
              onPress={this.login}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}> LOGIN </Text>
            </TouchableOpacity>
            {error && <Text> {error.data} </Text>}
          </View>
        </DismissKeyboardHoc>
      </SpinnerHocComponent >
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return { error: state.error, auth: state.auth }
}

export default connect(mapStateToProps, { login })(LoginContainer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 18,
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