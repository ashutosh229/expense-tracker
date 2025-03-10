import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ReactNode} from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: any; // Change `any` to a proper `User` type if available
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get(
            `${process.env.BACKEND_DOMAIN}/api/auth/profile`,
            {
              headers: {Authorization: `Bearer ${token}`},
            },
          );
          setUser(res.data.user);
        } catch {
          await AsyncStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        `${process.env.BACKEND_DOMAIN}/api/auth/login`,
        {
          email,
          password,
        },
      );
      await AsyncStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.message || error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await axios.post(`${process.env.BACKEND_DOMAIN}/api/auth/register`, {
        email,
        password,
      });
    } catch (error: any) {
      console.error(
        'Registration failed:',
        error.response?.data?.message || error,
      );
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, loading, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
