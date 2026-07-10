import './global.css';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { LanguageContext, useLanguageProvider } from '../hooks/useLanguage';
import { TabNavigator } from '../navigation/TabNavigator';
import { SplashScreen } from '../components/ui/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const lang = useLanguageProvider();

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <LanguageContext.Provider value={lang}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <TabNavigator />
      </NavigationContainer>
    </LanguageContext.Provider>
  );
}