import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home/Home.jsx';
import ViewSpendings from './screens/viewSpendings/ViewSpendings.jsx';
import Tutorial from './screens/tutorial/Tutorial.jsx';
import MoreStatistics from './screens/moreStatistics/MoreStatistics.jsx';
import GenerateReports from './screens/generateReports/GenerateReports.jsx';
import Welcome from './screens/welcome/Welcome.jsx';
import AboutTheApp from './screens/aboutTheApp/AboutTheApp.jsx';
import Register from './screens/register/Register.jsx';
import { Image, View, Text, StyleSheet } from 'react-native';
import LoginForm from './screens/login/LoginForm.jsx';
import { AuthProvider } from './screens/components/authContext/AuthContext.jsx';

const Stack = createStackNavigator();

const CustomHeader = () => (
  <Image
    source={require('./assets/app-logo.png')}
    style={styles.logo}
  />
);

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          screenOptions={({ route }) => ({
            headerTitle: () => <CustomHeader />,
            headerTitleAlign: 'center',
            headerTitleContainerStyle: {
              left: '10',
            },
            headerLeft: () => (
              <Text style={styles.headerTitle}>{route.name}</Text>
            ),
          })}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="LoginForm" component={LoginForm} />
          <Stack.Screen name="Inregistrare" component={Register} />
          <Stack.Screen name="Despre aplicatie" component={AboutTheApp} />
          <Stack.Screen name="Acasa" component={Home} />
          <Stack.Screen name="Tutorial" component={Tutorial} />
          <Stack.Screen name="Gestionare Cheltuieli" component={ViewSpendings} />
          <Stack.Screen name="Jurnal Cheltuieli" component={ViewSpendings} />
          <Stack.Screen name="Statistici Cheltuieli" component={MoreStatistics} />
          <Stack.Screen name="Consiliere Financiara" component={GenerateReports} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#333',
  },
});