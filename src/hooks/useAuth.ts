import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  phone: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (phone: string) => void;
  setProfile: (firstName: string, lastName: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  setProfile: () => {},
  logout: () => {},
});

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      if (data) {
        try {
          setUser(JSON.parse(data));
        } catch(e) {}
      }
      setLoaded(true);
    });
  }, []);

  const login = async (phone: string) => {
    const newUser = { phone, firstName: '', lastName: '' };
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const setProfile = async (firstName: string, lastName: string) => {
    if (!user) return;
    const updated = { ...user, firstName, lastName };
    setUser(updated);
    await AsyncStorage.setItem('user', JSON.stringify(updated));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return { user, isLoggedIn: !!user?.firstName, login, setProfile, logout, loaded };
}

export function useAuth() {
  return useContext(AuthContext);
}