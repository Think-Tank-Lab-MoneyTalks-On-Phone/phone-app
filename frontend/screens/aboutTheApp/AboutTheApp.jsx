import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import ScreensBackground from "../components/screens-background/ScreensBackground.jsx";
import LoginRegisterMenu from "../components/login-register-menu/LoginRegisterMenu.jsx";

export default function AboutTheApp() {
  return (
    <View style={styles.container}>
      <ScreensBackground/>
      <LoginRegisterMenu/>
      <Text style={styles.text}>&gt;:D</Text>
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
