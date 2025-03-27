import React, { useEffect, useState } from 'react';
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
import { Image, Text, StyleSheet } from 'react-native';
import LoginForm from './screens/login/LoginForm.jsx';
import { AuthProvider } from './screens/components/authContext/AuthContext.jsx';
import Account from './screens/account/Account.jsx';
import ProtectedRoute from './screens/components/protectedRoutes/ProtectedRoutes.jsx';
import PublicRoute from './screens/components/protectedRoutes/PublicRoute.jsx';
import { useAuth } from './screens/components/authContext/AuthContext.jsx';
import Logout from './screens/components/logout/Logout.jsx';
const Stack = createStackNavigator();

const CustomHeader = () => (
  <Image
    source={require('./assets/app-logo.png')}
    style={styles.logo}
  />
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return null;
  }

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
          {/* Rute publice */}
          <Stack.Screen name="Bun venit!">
            {() => <PublicRoute><Welcome /></PublicRoute>}
          </Stack.Screen>
          <Stack.Screen name="Despre aplicatie">
            {() => <PublicRoute><AboutTheApp /></PublicRoute>}
          </Stack.Screen>
          <Stack.Screen name="Autentificare">
            {() => <PublicRoute><LoginForm /></PublicRoute>}
          </Stack.Screen>
          <Stack.Screen name="Inregistrare">
            {() => <PublicRoute><Register /></PublicRoute>}
          </Stack.Screen>

          {/* Rute private */}
          <Stack.Screen name="Acasa">
            {() => <ProtectedRoute><Home /></ProtectedRoute>}
          </Stack.Screen>
          <Stack.Screen name="Tutorial">
            {() => <ProtectedRoute><Tutorial /></ProtectedRoute>}
          </Stack.Screen>
          <Stack.Screen name="Gestionare Cheltuieli">
            {() => <ProtectedRoute><ViewSpendings /></ProtectedRoute>}
          </Stack.Screen>
          <Stack.Screen name="Jurnal Cheltuieli">
            {() => <ProtectedRoute><ViewSpendings /></ProtectedRoute>}
          </Stack.Screen>
          <Stack.Screen name="Statistici Cheltuieli">
            {() => <ProtectedRoute><MoreStatistics /></ProtectedRoute>}
          </Stack.Screen>
          <Stack.Screen name="Consiliere Financiara">
            {() => <ProtectedRoute><GenerateReports /></ProtectedRoute>}
          </Stack.Screen>
          <Stack.Screen name="Setarile contului">
            {() => <ProtectedRoute><Account /></ProtectedRoute>}
          </Stack.Screen>
          <Stack.Screen name="Logout">
            {() => <ProtectedRoute><Logout /></ProtectedRoute>}
          </Stack.Screen>
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

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

export default App;
