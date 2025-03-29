import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import ScreensBackground from "../components/screens-background/ScreensBackground";
import SideBar from "../components/sideBar/SideBar";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../components/authContext/AuthContext";
import SettingsPageImage from "../../assets/settings-page-img.png";


const Account = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = await AsyncStorage.getItem('auth');
      if (!storedData) return;
      const { email, password } = JSON.parse(storedData);
      try {
        const response = await axios.get(`http://10.0.2.2:8080/users/byEmail/${email}`, {
          headers: {
            'Authorization': `Basic ${btoa(`${email}:${password}`)}`,
          },
        });
        setUserData(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      } catch (error) {
        Alert.alert('Eroare', 'Nu am putut obține datele utilizatorului.');
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateAccount = async () => {
    const storedData = await AsyncStorage.getItem('auth');
    const { email: storedEmail, password } = JSON.parse(storedData);
    try {
      const response = await axios.put(`http://10.0.2.2:8080/users/${userData.id}/profile`, { firstName, lastName, email }, {
        headers: {
          'Authorization': `Basic ${btoa(`${storedEmail}:${password}`)}`,
        },
      });
      Alert.alert('Succes', 'Datele contului au fost actualizate!');
      setUserData(response.data);
    } catch (error) {
      Alert.alert('Eroare', 'A apărut o eroare la actualizarea datelor.');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Eroare', 'Parolele nu coincid!');
      return;
    }
    const storedData = await AsyncStorage.getItem('auth');
    const { email: storedEmail, password } = JSON.parse(storedData);
    try {
      await axios.put(`http://10.0.2.2:8080/users/resetPassword/${storedEmail}`, { oldPassword, newPassword }, {
        headers: {
          'Authorization': `Basic ${btoa(`${storedEmail}:${password}`)}`,
        },
      });
      Alert.alert('Succes', 'Parola a fost schimbată cu succes!');
    } catch (error) {
      Alert.alert('Eroare', 'A apărut o eroare la schimbarea parolei.');
    }
  };

  const handleDeleteAccount = async () => {
    const storedData = await AsyncStorage.getItem('auth');
    const { email: storedEmail, password } = JSON.parse(storedData);
    try {
      await axios.delete(`http://10.0.2.2:8080/users/${userData.id}`, {
        headers: {
          'Authorization': `Basic ${btoa(`${storedEmail}:${password}`)}`,
        },
      });
      Alert.alert('Succes', 'Contul a fost șters!');
      await AsyncStorage.removeItem('auth');
      logout();
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Eroare', 'A apărut o eroare la ștergerea contului.');
    }
  };


  return (
    <>
      <ScreensBackground />
      <SideBar />
      <ScrollView contentContainerStyle={styles.container}>
        {selectedOption === null && (
          <Image
            source={SettingsPageImage}
            style={{ width: 250, height: 250, position: 'absolute', left: 65, bottom: 50 }}
            resizeMode="contain"
          />
        )}

        <Text style={styles.title}>Setările contului</Text>
        <TouchableOpacity style={styles.option} onPress={() => setSelectedOption('update')}><Text style={styles.buttonText}>Actualizați contul</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setSelectedOption('password')}><Text style={styles.buttonText}>Schimbați parola</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setSelectedOption('delete')}><Text style={styles.buttonText}>Ștergeți contul</Text></TouchableOpacity>
        {selectedOption === 'update' && (
          <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Prenume" value={firstName} onChangeText={setFirstName} />
            <TextInput style={styles.input} placeholder="Nume" value={lastName} onChangeText={setLastName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TouchableOpacity style={styles.button} onPress={handleUpdateAccount}><Text style={styles.buttonText}>Salvați modificările</Text></TouchableOpacity>
          </View>
        )}
        {selectedOption === 'password' && (
          <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Parola veche" secureTextEntry value={oldPassword} onChangeText={setOldPassword} />
            <TextInput style={styles.input} placeholder="Parola nouă" secureTextEntry value={newPassword} onChangeText={setNewPassword} />
            <TextInput style={styles.input} placeholder="Confirmare parola" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}><Text style={styles.buttonText}>Schimbați parola</Text></TouchableOpacity>
          </View>
        )}
        {selectedOption === 'delete' && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}><Text style={styles.buttonText}>Confirmați ștergerea contului</Text></TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, marginTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  option: { backgroundColor: '#fff200', padding: 10, margin: 20, borderRadius: 5, width: 175, height: 45, alignItems: 'center' },
  form: { width: '80%', marginTop: 40 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
  button: { backgroundColor: '#fff200', padding: 10, marginTop: 10, alignItems: 'center' },
  deleteButton: { backgroundColor: '#cf6f68', padding: 10, marginTop: 150, alignItems: 'center' },
  buttonText: { fontSize: 16, color: 'black' },
});

export default Account;