import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, textStyles } from '../../theme';

export interface Preset {
  id: string;
  name: string;
  icon: string;
  fg: string;
  bg: string;
  dotStyle: 'square' | 'circle' | 'diamond' | 'rounded';
  eyeStyle: 'classic' | 'circle' | 'rounded';
  gradient?: { start: string; end: string };
}

export const PRESETS: Preset[] = [
  { id: 'classic', name: 'Classic', icon: '🖤', fg: '#000000', bg: '#FFFFFF', dotStyle: 'square', eyeStyle: 'classic' },
  { id: 'neon', name: 'Neon', icon: '💚', fg: '#00FF88', bg: '#0A0A0A', dotStyle: 'rounded', eyeStyle: 'rounded' },
  { id: 'minimal', name: 'Minimal', icon: '🤍', fg: '#333333', bg: '#FAFAFA', dotStyle: 'circle', eyeStyle: 'circle' },
  { id: 'retro', name: 'Retro', icon: '🟤', fg: '#8B4513', bg: '#FFF8DC', dotStyle: 'square', eyeStyle: 'classic' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: '💜', fg: '#FF00FF', bg: '#0D0221', dotStyle: 'diamond', eyeStyle: 'rounded', gradient: { start: '#FF00FF', end: '#00FFFF' } },
  { id: 'ocean', name: 'Ocean', icon: '🌊', fg: '#0077B6', bg: '#CAF0F8', dotStyle: 'rounded', eyeStyle: 'circle' },
  { id: 'sunset', name: 'Sunset', icon: '🌅', fg: '#FF6B35', bg: '#FFE0B2', dotStyle: 'circle', eyeStyle: 'rounded', gradient: { start: '#FF6B35', end: '#FFB347' } },
  { id: 'gold', name: 'Gold', icon: '🥇', fg: '#FFD700', bg: '#1A1A1A', dotStyle: 'square', eyeStyle: 'classic' },
  { id: 'nature', name: 'Nature', icon: '🌿', fg: '#2D6A4F', bg: '#D8F3DC', dotStyle: 'circle', eyeStyle: 'rounded' },
  { id: 'midnight', name: 'Midnight', icon: '🌙', fg: '#E0E0E0', bg: '#1A1A2E', dotStyle: 'diamond', eyeStyle: 'circle', gradient: { start: '#16213E', end: '#0F3460' } },
];

interface QRStylePresetsProps {
  selectedPreset: string;
  onSelect: (preset: Preset) => void;
}

export function QRStylePresets({ selectedPreset, onSelect }: QRStylePresetsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎭 Style Presets</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {PRESETS.map((preset) => (
          <TouchableOpacity
            key={preset.id}
            style={[styles.preset, selectedPreset === preset.id && styles.selected]}
            onPress={() => onSelect(preset)}
          >
            <View style={[styles.preview, { backgroundColor: preset.bg }]}>
              <View style={[styles.previewDot, { backgroundColor: preset.fg, borderRadius: preset.dotStyle === 'circle' ? 50 : preset.dotStyle === 'rounded' ? 8 : 2 }]} />
              <View style={[styles.previewDot, { backgroundColor: preset.fg, borderRadius: preset.dotStyle === 'circle' ? 50 : preset.dotStyle === 'rounded' ? 8 : 2 }]} />
              <View style={[styles.previewDot, { backgroundColor: preset.fg, borderRadius: preset.dotStyle === 'circle' ? 50 : preset.dotStyle === 'rounded' ? 8 : 2 }]} />
            </View>
            <Text style={styles.name}>{preset.icon} {preset.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  title: { ...textStyles.bodySmall, color: colors.textSecondary },
  row: { gap: spacing.md, paddingVertical: spacing.xs },
  preset: {
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  selected: { borderColor: colors.primary[500], backgroundColor: colors.primary[50] },
  preview: {
    width: 44, height: 44,
    borderRadius: radius.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewDot: { width: 8, height: 8 },
  name: { ...textStyles.caption, color: colors.textSecondary },
});