import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from "../components/authContext/AuthContext.jsx"
import { useNavigation } from '@react-navigation/native';
import LoginRegisterMenu from '../components/login-register-menu/LoginRegisterMenu.jsx';
import ScreensBackground from '../components/screens-background/ScreensBackground.jsx';
import LoginFormImage from './loginFormImage/LoginFormImage.jsx';

const LoginForm = () => {
    const navigation = useNavigation();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');
        try {
            const response = await axios.get('http://10.0.2.2:8080/login', {
                headers: { 'Content-Type': 'application/json' },
                auth: { username: email, password: password }
            });

            login(email, password);
            Alert.alert('Succes', 'Bine ai (re)venit!');
        } catch (error) {
            setError(error.response?.data?.message || 'Datele introduse nu corespund cu cele ale unui cont!');
        }
    };

    return (
        <>
            <LoginRegisterMenu/>
            <ScreensBackground/>
            <View style={styles.container}>
                <Text style={styles.heading}>Autentificare</Text>
                <Text style={styles.subtitle}>Autentifică-te pentru a continua!</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Parolă"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Autentifică-te</Text>
                </TouchableOpacity>
            </View>
            <LoginFormImage/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        top: 110,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1089D3',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        width: '100%',
        backgroundColor: '#FFFF00',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'black',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginForm;
