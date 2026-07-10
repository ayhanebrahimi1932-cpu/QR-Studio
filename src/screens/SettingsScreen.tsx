import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/ui/Card';
import { GreenBackground } from '../components/ui/GreenBackground';
import { colors, spacing, textStyles } from '../theme';

export function SettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <GreenBackground />
      <Text style={styles.title}>⚙️ Settings</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>📱 About</Text>
          <Text style={styles.cardHint}>QR Studio v1.0</Text>
          <Text style={styles.cardHint}>Made by Ayhan Ebrahimi</Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  title: { ...textStyles.h2, color: colors.textPrimary, paddingHorizontal: spacing.lg, paddingVertical: spacing.base },
  scroll: { paddingHorizontal: spacing.lg },
  card: { gap: spacing.sm, marginBottom: spacing.base },
  cardTitle: { ...textStyles.h3, color: colors.textPrimary },
  cardHint: { ...textStyles.bodySmall, color: colors.textSecondary },
});