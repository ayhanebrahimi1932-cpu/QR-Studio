import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, radius, shadows, textStyles } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.white : colors.primary[500]}
          size="small"
        />
      ) : (
        <>
          {icon && icon}
          <Text
            style={[
              styles.text,
              styles[`text_${variant}`],
              styles[`textSize_${size}`],
              disabled && styles.textDisabled,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: radius.lg,
  },
  primary: {
    backgroundColor: colors.primary[500],
    ...shadows.md,
  },
  secondary: {
    backgroundColor: colors.surfaceSecondary,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.primary[500],
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  size_sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    minHeight: 36,
  },
  size_md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  size_lg: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  text: { ...textStyles.button },
  text_primary: { color: colors.white },
  text_secondary: { color: colors.textPrimary },
  text_outline: { color: colors.primary[500] },
  text_ghost: { color: colors.primary[500] },
  textSize_sm: { fontSize: 13 },
  textSize_md: { fontSize: 15 },
  textSize_lg: { fontSize: 17 },
  textDisabled: { opacity: 0.7 },
});