import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function ({ user, style, onPress }) {
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
      <Text style={styles.text}>
        {user.firstName}
      </Text>
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