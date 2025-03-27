import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WelcomePageWriting() {
    return (
        <View style={styles.welcomePageWriting}>
            <Text style={styles.message}>
                Ține-ți evidența cheltuielilor și{"\n"}obține sfaturi pentru{"\n"}îmbunătățirea stilului tău de viață!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomePageWriting: {
        position: 'absolute',
        top: -150,
        left: -160,
        width: '80%',
        alignItems: 'center',  // Asigură alinierea corectă pe orizontală
        transform: [{scale: 1.1}]
    },
    message: {
        fontFamily: 'Space Grotesk', // Dacă fontul este disponibil pe dispozitiv
        fontSize: 20,
        fontWeight: '100',
        color: '#183153',
        textAlign: 'center',
        lineHeight: 35,
        maxWidth: '100%',
    },
});
