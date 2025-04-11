import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

// Create auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // // Check if user is already logged in (from localStorage)
    // useEffect(() => {
    //     const user = localStorage.getItem('user');
    //     if (user) {
    //         setCurrentUser(JSON.parse(user));
    //     }
    //     setLoading(false);
    // }, []);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                setLoading(true);
                const user = await authService.getProfile(); // backend reads JWT from cookie
                setCurrentUser(user);
            } catch (err) {
                setCurrentUser(null); // Not logged in
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);


    const register = async (userName, email, password) => {
        try {
            setError(null);
            setLoading(true);

            const data = await authService.register(userName, email, password);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setCurrentUser(data.user);
            return data;
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            setLoading(true);

            const data = await authService.login(email, password);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setCurrentUser(data.user);
            return data;
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loading,
        error,
        register,
        login,
        logout,
        getProfile: authService.getProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;