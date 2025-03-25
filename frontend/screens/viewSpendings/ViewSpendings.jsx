import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function ViewSpendings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>&gt;:D</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
