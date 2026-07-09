import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radius, shadows } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.base,
    ...shadows.md,
  },
});