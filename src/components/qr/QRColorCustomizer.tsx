import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, textStyles } from '../../theme';

interface QRColorCustomizerProps {
  foregroundColor: string;
  backgroundColor: string;
  onForegroundChange: (color: string) => void;
  onBackgroundChange: (color: string) => void;
}

const QR_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Blue', value: '#1565C0' },
  { name: 'Red', value: '#C62828' },
  { name: 'Green', value: '#2E7D32' },
  { name: 'Purple', value: '#7B1FA2' },
  { name: 'Orange', value: '#E65100' },
  { name: 'Pink', value: '#C2185B' },
];

export function QRColorCustomizer({
  foregroundColor,
  backgroundColor,
  onForegroundChange,
  onBackgroundChange,
}: QRColorCustomizerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Foreground</Text>
      <View style={styles.row}>
        {QR_COLORS.map((color) => (
          <TouchableOpacity
            key={`fg-${color.value}`}
            style={[
              styles.swatch,
              { backgroundColor: color.value },
              color.value === '#FFFFFF' && styles.whiteSwatch,
              foregroundColor === color.value && styles.selected,
            ]}
            onPress={() => onForegroundChange(color.value)}
          />
        ))}
      </View>

      <Text style={styles.label}>Background</Text>
      <View style={styles.row}>
        {QR_COLORS.slice(0, 4).map((color) => (
          <TouchableOpacity
            key={`bg-${color.value}`}
            style={[
              styles.swatch,
              { backgroundColor: color.value },
              color.value === '#FFFFFF' && styles.whiteSwatch,
              backgroundColor === color.value && styles.selected,
            ]}
            onPress={() => onBackgroundChange(color.value)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  label: {
    ...textStyles.bodySmall,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  whiteSwatch: {
    borderColor: colors.border,
  },
  selected: {
    borderColor: colors.primary[500],
    borderWidth: 3,
    transform: [{ scale: 1.15 }],
  },
});