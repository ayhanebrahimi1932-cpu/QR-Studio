import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, textStyles } from '../../theme';
import { Button } from './Button';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
}

export function EmptyState({ icon, title, description, buttonTitle, onButtonPress }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {buttonTitle && onButtonPress && (
        <Button title={buttonTitle} onPress={onButtonPress} variant="primary" size="md" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    gap: spacing.base,
  },
  icon: { fontSize: 64, marginBottom: spacing.sm },
  title: {
    ...textStyles.h3,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  description: {
    ...textStyles.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});