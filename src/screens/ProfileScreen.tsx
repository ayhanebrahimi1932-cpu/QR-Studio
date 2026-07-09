import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '../components/ui/Button';
import { colors, spacing, radius, shadows, textStyles } from '../theme';

interface Props { onComplete: () => void; }

export function ProfileScreen({ onComplete }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) { Alert.alert('Error', 'Fill all fields'); return; }
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    data.firstName = firstName.trim();
    data.lastName = lastName.trim();
    localStorage.setItem('user', JSON.stringify(data));
    onComplete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>👤</Text>
      <Text style={styles.title}>Create Profile</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name" placeholderTextColor={colors.textTertiary} />
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last Name" placeholderTextColor={colors.textTertiary} />
      <Button title="Let's Go! 🚀" onPress={handleSave} variant="primary" size="lg" fullWidth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: spacing.xl, gap: spacing.lg },
  emoji: { fontSize: 64 },
  title: { ...textStyles.h2, color: colors.textPrimary, textAlign: 'center' },
  input: { width: '100%', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, paddingHorizontal: spacing.base, paddingVertical: spacing.md, fontSize: 16, color: colors.textPrimary, ...shadows.sm },
});