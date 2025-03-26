import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import ScreensBackground from "../components/screens-background/ScreensBackground.jsx";

export default function AboutTheApp() {
  return (
    <View style={styles.container}>
      <ScreensBackground/>
      <Text style={styles.text}>&gt;:DDD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 34,
    color: 'black',
  },
});
