import React from 'react'
import { View, StyleSheet } from 'react-native'

export default ({ children, side}) => {
  return (
    <View style={side? styles.left: styles.right}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  right: {
    marginTop: 10,
    marginHorizontal: 10,
    padding: 8,
    alignSelf: 'flex-end' ,
    backgroundColor: '#66FF66',
    borderRadius: 10,
  },
  left: {
    marginTop: 10,
    marginHorizontal: 10,
    padding: 8,
    alignSelf: 'flex-start' ,
    backgroundColor: '#fff',
    borderRadius: 10,
  }
})
