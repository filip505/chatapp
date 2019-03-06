import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function ({ user, style, onPress }) {
  return (
    <TouchableOpacity
      style={[style, styles.container]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {" <"}
        </Text>
      <Image
          style={styles.image}
          source={{ uri: user.image }}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.text}>
            {user.firstName}
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
      height: 40,
      width: 40
    },
  text: {
        fontSize: 20,
    }
})