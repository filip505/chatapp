import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default ({ message }) => {
  return (
    <View key={message.id}>
      <Text>{message.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
})