import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, textStyles } from '../../theme';

export type DotStyle = 'square' | 'circle' | 'diamond' | 'rounded' | 'star' | 'hexagon';

interface PatternOption {
  style: DotStyle;
  label: string;
  icon: string;
  preview: string;
}

const PATTERNS: PatternOption[] = [
  { style: 'square', label: 'Square', icon: '▣', preview: '■■■' },
  { style: 'circle', label: 'Circle', icon: '●', preview: '●●●' },
  { style: 'diamond', label: 'Diamond', icon: '◆', preview: '◆◆◆' },
  { style: 'rounded', label: 'Rounded', icon: '◉', preview: '◉◉◉' },
  { style: 'star', label: 'Star', icon: '★', preview: '★★★' },
  { style: 'hexagon', label: 'Hexagon', icon: '⬡', preview: '⬡⬡⬡' },
];

interface QRPatternPickerProps {
  selected: DotStyle;
  onSelect: (style: DotStyle) => void;
}

export function QRPatternPicker({ selected, onSelect }: QRPatternPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📐 Dot Style</Text>
      <View style={styles.grid}>
        {PATTERNS.map((p) => (
          <TouchableOpacity
            key={p.style}
            style={[styles.item, selected === p.style && styles.selected]}
            onPress={() => onSelect(p.style)}
          >
            <Text style={styles.previewText}>{p.preview}</Text>
            <Text style={[styles.icon]}>{p.icon}</Text>
            <Text style={[styles.label, selected === p.style && styles.labelSelected]}>{p.label}</Text>
            {selected === p.style && <Text style={styles.checkmark}>✅</Text>}
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
  previewText: { fontSize: 14, letterSpacing: 2 },
  icon: { fontSize: 20 },
  label: { ...textStyles.caption, color: colors.textTertiary },
  labelSelected: { color: colors.primary[500], fontWeight: '600' },
  checkmark: { position: 'absolute', top: -6, right: -6, fontSize: 14 },
});