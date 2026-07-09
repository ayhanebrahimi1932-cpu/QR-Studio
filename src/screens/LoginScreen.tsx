import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '../components/ui/Button';
import { colors, spacing, radius, shadows, textStyles } from '../theme';

interface Props { onComplete: () => void; }

export function LoginScreen({ onComplete }: Props) {
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    if (phone.length < 10) { Alert.alert('Error', 'Enter valid phone'); return; }
    localStorage.setItem('user', JSON.stringify({ phone, firstName: '', lastName: '' }));
    onComplete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📱</Text>
      <Text style={styles.title}>Welcome to QR Studio</Text>
      <Text style={styles.subtitle}>Enter your phone number</Text>
      <View style={styles.inputBox}>
        <Text style={styles.prefix}>+98</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="912 345 6789" placeholderTextColor={colors.textTertiary} keyboardType="phone-pad" maxLength={10} />
      </View>
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
  inputBox: { flexDirection: 'row', width: '100%', backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', ...shadows.sm },
  prefix: { paddingHorizontal: spacing.base, paddingVertical: spacing.md, fontWeight: '600', color: colors.primary[500], borderRightWidth: 1, borderRightColor: colors.borderLight },
  input: { flex: 1, paddingHorizontal: spacing.base, paddingVertical: spacing.md, fontSize: 16, color: colors.textPrimary },
  disclaimer: { ...textStyles.caption, color: colors.textTertiary },
});