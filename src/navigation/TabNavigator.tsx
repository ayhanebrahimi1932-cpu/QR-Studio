import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLanguage } from '../hooks/useLanguage';
import { HomeScreen } from '../screens/HomeScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { colors, spacing, shadows, textStyles } from '../theme';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const { t } = useLanguage();

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: colors.primary[500],
      tabBarInactiveTintColor: colors.textTertiary,
      tabBarLabelStyle: styles.tabLabel,
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t.tabs.home, tabBarIcon: () => <Text style={{fontSize:20}}>🏠</Text> }} />
      <Tab.Screen name="Scan" component={ScanScreen} options={{ tabBarLabel: t.tabs.scan, tabBarIcon: () => <Text style={{fontSize:20}}>📷</Text> }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ tabBarLabel: t.tabs.history, tabBarIcon: () => <Text style={{fontSize:20}}>📋</Text> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: t.tabs.settings, tabBarIcon: () => <Text style={{fontSize:20}}>⚙️</Text> }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    height: 90,
    paddingTop: 10,
    paddingBottom: 35,
    ...shadows.lg,
  },
  tabLabel: { ...textStyles.tab },
});