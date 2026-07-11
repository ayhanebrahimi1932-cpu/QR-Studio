import './global.css';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext, useLanguageProvider } from '../hooks/useLanguage';
import { TabNavigator } from '../navigation/TabNavigator';
import { SplashScreen } from '../components/ui/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export default function App() {
  const [step, setStep] = useState<'splash' | 'login' | 'profile' | 'app'>('splash');
  const lang = useLanguageProvider();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        const user = JSON.parse(data);
        if (user.firstName) {
          setStep('app');
          return;
        }
        if (user.phone) {
          setStep('splash');
          return;
        }
      }
    } catch(e) {}
  };

  if (step === 'splash') return <SplashScreen onFinish={async () => {
    const data = await AsyncStorage.getItem('user');
    if (data) {
      const user = JSON.parse(data);
      if (user.firstName) setStep('app');
      else if (user.phone) setStep('profile');
      else setStep('login');
    } else {
      setStep('login');
    }
  }} />;
  if (step === 'login') return <LoginScreen onComplete={() => setStep('profile')} />;
  if (step === 'profile') return <ProfileScreen onComplete={() => setStep('app')} />;

  return (
    <LanguageContext.Provider value={lang}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <TabNavigator />
      </NavigationContainer>
    </LanguageContext.Provider>
  );
}