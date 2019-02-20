import React from 'react'
import { View, StyleSheet } from 'react-native'

export default ({ children, side, error}) => {
  return (
    <View style={[side? styles.left: styles.right, error? styles.error: {}]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  right: {
    marginTop: 10,
    width: '80%',
    marginHorizontal: 10,
    padding: 8,
    alignSelf: 'flex-end' ,
    backgroundColor: '#66FF66',
    borderRadius: 10,
  },
  left: {
    marginTop: 10,
    width: '80%',
    marginHorizontal: 10,
    padding: 8,
    alignSelf: 'flex-start' ,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  error: {
    backgroundColor: '#FF7F7F',
    alignSelf: 'flex-start'
  },
})
