import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useAuth } from '../authContext/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProtectedRoute = ({ children }) => {
    const { userEmail, isLoading } = useAuth();
    const navigation = useNavigation();
  
    React.useEffect(() => {
      if (!isLoading && !userEmail) {
        navigation.navigate('Autentificare');
      }
    }, [isLoading, userEmail]);
  
    if (isLoading || !userEmail) return null;
  
    return children;
  };

export default ProtectedRoute;
