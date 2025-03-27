import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import welcomePageImage from '../../../assets/welcome-page-img.png';

export default function WelcomePageImage() {
    return (
        <View style={styles.wlcPageImg}>
            <Image source={welcomePageImage} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    wlcPageImg: {
        position: 'absolute',
        width: 450, 
        top: -60,
        left: -300,
        transform: [{ scale: 0.55 }],
    },
    image: {
        width: '150%',
    },
});
