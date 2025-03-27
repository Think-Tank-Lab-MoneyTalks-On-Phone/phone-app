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
        position: 'absolute', // echivalentul "fixed" în React Native
        maxWidth: 700,
        top: '55%',
        left: '30%',
        transform: [{ translateX: -350 }], // pentru a corecta poziția pe axa X
    },
});
