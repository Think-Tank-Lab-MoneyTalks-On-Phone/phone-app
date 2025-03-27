import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();
const SESSION_EXPIRATION_MS = 12 * 60 * 60 * 1000; // 12 ore

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedData = await AsyncStorage.getItem('auth');
                if (storedData) {
                    const { email, password, expiration } = JSON.parse(storedData);
                    if (new Date().getTime() < expiration) {
                        setUserEmail(email);
                        setUserPassword(password);
                        const remainingTime = expiration - new Date().getTime();
                        setTimeout(logout, remainingTime);
                    } else {
                        logout();
                    }
                }
            } catch (error) {
                console.error('Error checking auth:', error);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const expirationTime = new Date().getTime() + SESSION_EXPIRATION_MS;
            await AsyncStorage.setItem('auth', JSON.stringify({ email, password, expiration: expirationTime }));
            setUserEmail(email);
            setUserPassword(password);
            setTimeout(logout, SESSION_EXPIRATION_MS);
            
            const lastExecution = await AsyncStorage.getItem('lastReportExecution');
            const now = new Date().getTime();

            if (!lastExecution || now - parseInt(lastExecution) > SESSION_EXPIRATION_MS) {
                handleGenerateReport();
            }
            
            navigation.navigate('Acasa'); 
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('auth');
            setUserEmail(null);
            setUserPassword(null);
            navigation.navigate('Autentificare');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    

    return (
        <AuthContext.Provider value={{ userEmail, userPassword, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
