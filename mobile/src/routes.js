import * as React from "react";
import { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginContainer from "./container/auth/Login.container";

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator({
  Home: {
    screen: LoginContainer
  },
  Login: {
    screen: LoginContainer
  }
});

export default createAppContainer(RootStack)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
