import './global.css';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { LanguageContext, useLanguageProvider } from '../hooks/useLanguage';
import { TabNavigator } from '../navigation/TabNavigator';
import { SplashScreen } from '../components/ui/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export default function App() {
  const [step, setStep] = useState<'splash' | 'login' | 'profile' | 'app'>('splash');
  const lang = useLanguageProvider();

  if (step === 'splash') return <SplashScreen onFinish={() => setStep('login')} />;
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