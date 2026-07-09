import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('theme').then(val => {
      setIsDark(val === 'dark');
    });
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    await AsyncStorage.setItem('theme', next ? 'dark' : 'light');
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  return { isDark, toggleTheme };
}