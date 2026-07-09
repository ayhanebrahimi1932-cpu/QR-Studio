import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { colors, spacing, textStyles } from '../theme';

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setIsDark(true);
      document.body.style.background = '#0f1a13';
    }
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('darkMode', String(next));
    document.body.style.background = next ? '#0f1a13' : '#e8f0e4';
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>⚙️ Settings</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.cardTitle}>🌙 Dark Mode</Text>
            <Switch value={isDark} onValueChange={toggleDark} />
          </View>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>📱 About</Text>
          <Text style={styles.cardHint}>QR Studio v2.0</Text>
        </Card>
        <Button title="🚪 Logout" variant="outline" onPress={handleLogout} fullWidth />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { ...textStyles.h2, color: colors.textPrimary, paddingHorizontal: spacing.lg, paddingVertical: spacing.base },
  scroll: { paddingHorizontal: spacing.lg, gap: spacing.base },
  card: { marginBottom: spacing.base },
  cardTitle: { ...textStyles.h3, color: colors.textPrimary },
  cardHint: { ...textStyles.bodySmall, color: colors.textSecondary },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});