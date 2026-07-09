import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radius, textStyles } from '../../theme';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function Chip({ label, selected, onPress, icon, style }: ChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selected, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && icon}
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },
  selected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  label: {
    ...textStyles.bodySmall,
    color: colors.textSecondary,
  },
  selectedLabel: {
    color: colors.white,
    fontFamily: textStyles.button.fontFamily,
  },
});