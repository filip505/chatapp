import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default (prop) => {
  const { children, spinner} = prop
  return (
    <View style={{ flex: 1 }}>
      {children}
      {spinner &&
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
          ]}
        >
          <ActivityIndicator size="large" />
        </View>}
    </View>

  );
};

