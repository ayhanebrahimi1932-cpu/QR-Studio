import './global.css';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { LanguageContext, useLanguageProvider } from '../hooks/useLanguage';
import { AuthContext, useAuthProvider } from '../hooks/useAuth';
import { TabNavigator } from '../navigation/TabNavigator';
import { SplashScreen } from '../components/ui/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme';

export default function App() {
  const [step, setStep] = useState<'splash' | 'login' | 'profile' | 'app'>('splash');
  const lang = useLanguageProvider();
  const auth = useAuthProvider();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const data = localStorage.getItem('user');
    if (data) {
      try {
        const user = JSON.parse(data);
        if (user.firstName) setStep('app');
      } catch(e) {}
    }
  };

  if (step === 'splash') return <SplashScreen onFinish={() => setStep('login')} />;
  if (step === 'login') return <LoginScreen onComplete={() => setStep('profile')} />;
  if (step === 'profile') return <ProfileScreen onComplete={() => setStep('app')} />;

  return (
    <LanguageContext.Provider value={lang}>
      <AuthContext.Provider value={auth}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <TabNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    </LanguageContext.Provider>
  );
}