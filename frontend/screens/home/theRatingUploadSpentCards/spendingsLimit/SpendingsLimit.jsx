import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ToastAndroid } from 'react-native';

export default function SpendingsLimit({ onLimitaConfirm }) {
    const [showInput, setShowInput] = useState(false);
    const [valoare, setValoare] = useState('');

    const handleConfirm = () => {
        const numar = parseInt(valoare, 10);
        if (numar > 100 && numar < 999999) {
            onLimitaConfirm(numar);
            setShowInput(false);
        } else {
            ToastAndroid.show('Introduceți un număr mai mare de 100 și mai mic ca 999.999!', ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.container}>
            {!showInput ? (
                <TouchableOpacity
                    onPress={() => setShowInput(true)}
                    style={{
                        backgroundColor: "#FFF200", // Fundal galben ca în exemplul tău
                        padding: 12,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 10
                    }}
                >
                    <Text style={{
                        color: "black", // Culoarea textului negru
                        fontSize: 16,
                        fontWeight: '500'
                    }}>
                        Setează limită cheltuieli pe această lună
                    </Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={valoare}
                        onChangeText={setValoare}
                        placeholder="Introduceți limita"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        onPress={handleConfirm}
                        style={{
                            backgroundColor: "#FFF200",
                            paddingVertical: 8,
                            paddingHorizontal: 24,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            elevation: 3
                        }}
                    >
                        <Text style={{
                            color: "black",
                            fontSize: 16,
                            fontWeight: "600"
                        }}>
                            Confirmă limita
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 100,
        right: 4,
        transform: [{ scale: 0.8 }],
        zIndex: 11,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
        left: 38,
    },
    input: {
        padding: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        fontSize: 16,
        width: 150,
    },
});
