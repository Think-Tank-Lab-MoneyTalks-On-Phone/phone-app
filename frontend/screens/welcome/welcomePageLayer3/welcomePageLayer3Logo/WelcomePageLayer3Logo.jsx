import React from "react";
import { View, StyleSheet } from "react-native";
import Logos from "../../../components/logos/Logos"; // presupunând că Logos este o componentă React Native

export default function WelcomePageLayer3Logo() {
    return (
        <View style={styles.wlcPageLayer3Logo}>
            <Logos />
        </View>
    );
}

const styles = StyleSheet.create({
    wlcPageLayer3Logo: {
        position: "absolute",
        width: 100,
        top: -425,
        bottom: 0,
        left: 0,
        right: 20,
        transform: [
            { scale: 0.3 },
            { translateX: -670 }
          ],          
    },
});
