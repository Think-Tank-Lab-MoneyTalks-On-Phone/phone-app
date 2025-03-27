import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LoginRegisterMenu from '../components/login-register-menu/LoginRegisterMenu';
import ScreensBackground from '../components/screens-background/ScreensBackground';

const RegisterForm = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [samePassword, setSamePassword] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setSamePassword(false);
      setError('Parolele introduse nu se potrivesc!');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:8080/signup', {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Succes', 'Înregistrarea s-a realizat cu succes!');
        setTimeout(() => navigation.navigate("Autentificare"), 1500);
      }
    } catch (err) {
      const errorMessage = err.response?.data || 'A apărut o eroare la înregistrare.';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <>
      <ScreensBackground />
      <LoginRegisterMenu />
      <View style={styles.container}>
        <Text style={styles.heading}>Înregistrare</Text>
        <Text style={styles.subtitle}>Creează un cont pentru a începe.</Text>

        <TextInput
          style={styles.input}
          placeholder="Nume"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Prenume"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Parolă"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmă parolă"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setSamePassword(text === password);
          }}
          secureTextEntry
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Înregistrează-te</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Autentificare")}>
          <Text style={styles.link}>Deții deja un cont? Autentifică-te!</Text>
        </TouchableOpacity>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1089D3',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
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
  link: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default RegisterForm;
