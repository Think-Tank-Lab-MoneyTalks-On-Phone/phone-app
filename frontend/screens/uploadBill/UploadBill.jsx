import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import ScreensBackground from "../components/screens-background/ScreensBackground";
import SideBar from "../components/sideBar/SideBar";
import OnlineSpending from "./onlineSpending/OnlineSpending";
import { ScrollView } from "react-native-gesture-handler";

export default function UploadBill() {
  return (
    <View style={styles.container}>
      <ScreensBackground/>
      <SideBar/>
      <ScrollView>
      <OnlineSpending />
      </ScrollView>
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
