import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WelcomePageLayer3Writing() {
    return (
        <View style={styles.welcomePageLayer3Writing}>
            <Text style={styles.messageLayer3}>
                Înregistrează-te gratuit pe platforma noastră și{"\n"}obține multe alte beneficii!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomePageLayer3Writing: {
        position: 'absolute', // Înlocuim 'fixed' cu 'absolute'
        top: '20%',
        left: '10%',
        width: '80%',
    },
    messageLayer3: {
        fontFamily: 'Space Grotesk', // Va trebui să ai fontul respectiv adăugat în proiectul tău
        fontSize: 46,
        fontWeight: '600',
        color: '#183153',
        textAlign: 'center',
        lineHeight: 1.5,
        maxWidth: '100%',
    },
});
