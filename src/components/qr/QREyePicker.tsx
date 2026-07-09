import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, textStyles } from '../../theme';

export type EyeStyle = 'classic' | 'circle' | 'rounded' | 'frame' | 'dots' | 'sparkle';

interface EyeOption {
  style: EyeStyle;
  label: string;
  icon: string;
  shape: string;
}

const EYES: EyeOption[] = [
  { style: 'classic', label: 'Classic', icon: '◫', shape: '◫ ◫ ◫' },
  { style: 'circle', label: 'Circle', icon: '◎', shape: '◎ ◎ ◎' },
  { style: 'rounded', label: 'Rounded', icon: '▣', shape: '▣ ▣ ▣' },
  { style: 'frame', label: 'Frame', icon: '▤', shape: '▤ ▤ ▤' },
  { style: 'dots', label: 'Dots', icon: '⬢', shape: '⬢ ⬢ ⬢' },
  { style: 'sparkle', label: 'Sparkle', icon: '✦', shape: '✦ ✦ ✦' },
];

interface QREyePickerProps {
  selected: EyeStyle;
  onSelect: (style: EyeStyle) => void;
}

export function QREyePicker({ selected, onSelect }: QREyePickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👁 Eye Style</Text>
      <View style={styles.grid}>
        {EYES.map((e) => (
          <TouchableOpacity
            key={e.style}
            style={[styles.item, selected === e.style && styles.selected]}
            onPress={() => onSelect(e.style)}
          >
            <Text style={styles.shapeText}>{e.shape}</Text>
            <Text style={styles.icon}>{e.icon}</Text>
            <Text style={[styles.label, selected === e.style && styles.labelSelected]}>{e.label}</Text>
            {selected === e.style && <Text style={styles.checkmark}>✅</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: radius.xl,
    padding: spacing.base,
    gap: spacing.sm,
  },
  title: { ...textStyles.bodySmall, color: colors.textSecondary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  item: {
    width: '30%',
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.borderLight,
    alignItems: 'center',
    gap: spacing.xxs,
    position: 'relative',
  },
  selected: { borderColor: colors.primary[500], backgroundColor: colors.primary[50] },
  shapeText: { fontSize: 12, letterSpacing: 3 },
  icon: { fontSize: 20 },
  label: { ...textStyles.caption, color: colors.textTertiary },
  labelSelected: { color: colors.primary[500], fontWeight: '600' },
  checkmark: { position: 'absolute', top: -6, right: -6, fontSize: 14 },
});