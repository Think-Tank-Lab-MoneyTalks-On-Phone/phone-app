import React from 'react';
import { useAuth } from '../authContext/AuthContext';
import { useNavigation } from '@react-navigation/native';

const PublicRoute = ({ children }) => {
    const { userEmail, isLoading } = useAuth();
    const navigation = useNavigation();
  
    React.useEffect(() => {
      if (!isLoading && userEmail) {
        navigation.navigate('Acasa');
      }
    }, [isLoading, userEmail]);
  
    if (isLoading || userEmail) return null;
  
    return children;
  };

export default PublicRoute;
