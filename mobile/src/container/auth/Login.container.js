import * as React from 'react'
import { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Keyboard, AsyncStorage } from 'react-native'
import SpinnerHocComponent from '../../component/spinner.hoc';
import DismissKeyboardHoc from '../../component/dismissKeyboard.hoc'
import { connect } from 'react-redux'
import { login } from './../../action/auth.action'
import { RSA, RSAKeychain } from 'react-native-rsa-native';

class LoginContainer extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      logging: false,
      username: 'test',
      password: 'test'
    }
  }

  componentWillReceiveProps(props) {
    if (props.auth) {
      props.navigation.navigate('SignedIn')
    }
  }

  loginHandler = async () => {
    Keyboard.dismiss()
    //this.setState({ logging: true });
    const { username, password } = this.state
    const keys = await RSA.generateKeys(4096)
    // .then(keys => {
    //   console.log('4096 private:', keys.private) // the private key
    //   console.log('4096 public:', keys.public) // the public key
    // })
    await AsyncStorage.setItem('private_key', keys.private)
    console.log('key', login)
    login(username, password, keys.public, () => this.setState({ logging: false }))
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
              onPress={this.loginHandler}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}> LOGIN </Text>
            </TouchableOpacity>
            {error && <Text> {error.data} </Text>}
          </View>
        </DismissKeyboardHoc>
      </SpinnerHocComponent>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return { error: state.error, auth: state.auth }
}

export default connect(mapStateToProps)(LoginContainer)

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