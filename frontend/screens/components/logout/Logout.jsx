import React, { useEffect } from 'react';
import { useAuth } from '../authContext/AuthContext'; 
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
    const { logout } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Autentificare' }],
            });
        };
        performLogout();
    }, []);

    return null;
};

export default Logout;