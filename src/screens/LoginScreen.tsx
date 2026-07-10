import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/ui/Button';
import { colors, spacing, radius, shadows, textStyles } from '../theme';

interface Props { onComplete: () => void; }

export function LoginScreen({ onComplete }: Props) {
  const [phone, setPhone] = useState('');

  const handleLogin = async () => {
    const clean = phone.replace(/[^+\d]/g, '');
    if (clean.length < 7) { Alert.alert('Error', 'Enter a valid phone number'); return; }
    try {
      await AsyncStorage.setItem('user', JSON.stringify({ phone: clean, firstName: '', lastName: '' }));
      onComplete();
    } catch(e) {
      Alert.alert('Error', 'Could not save. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📱</Text>
      <Text style={styles.title}>Welcome to QR Studio</Text>
      <Text style={styles.subtitle}>Enter your phone number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="+1 234 567 8900"
        placeholderTextColor={colors.textTertiary}
        keyboardType="phone-pad"
      />
      <Button title="Continue →" onPress={handleLogin} variant="primary" size="lg" fullWidth />
      <Text style={styles.disclaimer}>Stored locally only</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: spacing.xl, gap: spacing.lg },
  emoji: { fontSize: 64 },
  title: { ...textStyles.h2, color: colors.textPrimary, textAlign: 'center' },
  subtitle: { ...textStyles.body, color: colors.textSecondary, textAlign: 'center' },
  input: { width: '100%', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, paddingHorizontal: spacing.base, paddingVertical: spacing.md, fontSize: 18, color: colors.textPrimary, textAlign: 'center', ...shadows.sm },
  disclaimer: { ...textStyles.caption, color: colors.textTertiary },
});