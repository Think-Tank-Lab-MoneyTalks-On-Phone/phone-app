import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import image from "../../../assets/background.png";

export default function ScreensBackground() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    zIndex: -1,
  },
  image: {
    flex: 1,
    width: "200%",
    left: -175,
    height: "100%",
    opacity: 0.4,
  },
});
