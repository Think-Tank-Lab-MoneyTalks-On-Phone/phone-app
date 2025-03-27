import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LoginImage from "../../../assets/login-page-image.png";

export default function LoginFormImage() {
    return (
        <View style={styles.loginPageImg}>
            <Image source={LoginImage} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    loginPageImg: {
        position: 'absolute',
        width: 450, 
        top: -300,
        left: -140,
        transform: [{ scale: 0.3 }],
    },
    image: {
        width: '270%',
    },
});
