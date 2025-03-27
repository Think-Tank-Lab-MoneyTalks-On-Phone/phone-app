import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function WelcomePageLayer2Writing() {
    return (
        <View style={styles.welcomePageLayer2Writing}>
            <Text style={styles.messageLayer2}>
                Încarcă bonurile, facturile și cheltuielile{'\n'} online pentru a genera rapoarte{'\n'} personalizate destinate gestionării{'\n'} cheltuielilor tale!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomePageLayer2Writing: {
        position: 'absolute', // React Native folosește absolute în loc de fixed
        top: -200,
        left: -295,
        width: '1000%',
    },
    messageLayer2: {
        fontFamily: 'Space Grotesk', // Asigură-te că ai fontul instalat sau folosești unul similar
        fontSize: 20,
        fontWeight: '600',
        color: '#183153',
        textAlign: 'center',
        lineHeight: 35,
        maxWidth: '100%',
    },
});
