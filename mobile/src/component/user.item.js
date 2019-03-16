import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function ({ conversation, style, onPress, user, message }) {
  return (
    <TouchableOpacity
      style={[style, styles.container]}
      onPress={onPress}
    >
      <Image
        style={styles.image}
        source={{ uri: user.image }}
      />
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.text}>
          {user.firstName}
        </Text>
        <Text style={styles.text}>
          {conversation.updated_at}
        </Text>
        <Text style={styles.text}>
          {message.text}
          {conversation.messageCount}
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