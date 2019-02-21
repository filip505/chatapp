import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function ({ user, style, onPress, lastMessage }) {
  console.log('user', user)
  return (
    <TouchableOpacity
      style={[style, styles.container]}
      onPress={onPress}
    >
      <Image
        style={styles.image}
        source={{ uri: user.image }}
      />
      <View style= {{flexDirection: 'column'}}>
        <Text style={styles.text}>
          {user.firstName}
        </Text>
        <Text style={styles.text}>
          {lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    margin: 10,
    height: 80,
    width: 80
  },
  text: {
    fontSize: 20,
  }
})