import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import ScreensBackground from "../components/screens-background/ScreensBackground";
import TheRatingUploadSpentCards from "./theRatingUploadSpentCards/TheRatingUploadSpentCards";
import SideBar from "../components/sideBar/SideBar";

export default function Home() {
  return (
    <View style={styles.container}>
      <ScreensBackground/>
      <SideBar/>
      <TheRatingUploadSpentCards/>
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
