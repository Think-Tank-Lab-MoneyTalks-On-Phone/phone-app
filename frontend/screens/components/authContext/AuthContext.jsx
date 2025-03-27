import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();
const SESSION_EXPIRATION_MS = 12 * 60 * 60 * 1000; // 12 ore

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [logoutTimer, setLogoutTimer] = useState(null);

    const clearSessionTimer = () => {
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    const checkAuth = async () => {
        try {
            const storedData = await AsyncStorage.getItem('auth');
            if (storedData) {
                const { email, password, expiration } = JSON.parse(storedData);
                if (new Date().getTime() < expiration) {
                    setUserEmail(email);
                    setUserPassword(password);
                    const remainingTime = expiration - new Date().getTime();
                    setLogoutTimer(setTimeout(logout, remainingTime));
                } else {
                    await AsyncStorage.removeItem('auth');
                }
            }
        } catch (error) {
            console.error('Error checking auth:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuth();
        return () => clearSessionTimer();
    }, []);

    const login = async (email, password) => {
        try {
            clearSessionTimer();
            const expirationTime = new Date().getTime() + SESSION_EXPIRATION_MS;
            await AsyncStorage.setItem('auth', JSON.stringify({ email, password, expiration: expirationTime }));
            setUserEmail(email);
            setUserPassword(password);
            setLogoutTimer(setTimeout(logout, SESSION_EXPIRATION_MS));
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = async () => {
        try {
            clearSessionTimer();
            await AsyncStorage.removeItem('auth');
            setUserEmail(null);
            setUserPassword(null);
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
