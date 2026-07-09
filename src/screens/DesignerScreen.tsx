import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet, Alert,
  Dimensions, Platform, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import { useLanguage } from '../hooks/useLanguage';
import { useQRGenerator } from '../hooks/useQRGenerator';
import { Button } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { QRStylePresets, Preset } from '../components/qr/QRStylePresets';
import { QRPatternPicker, DotStyle } from '../components/qr/QRPatternPicker';
import { QREyePicker, EyeStyle } from '../components/qr/QREyePicker';
import { colors, spacing, radius, shadows, textStyles } from '../theme';

const QR_TYPES = [
  { key: 'text' as const, icon: '📝' }, { key: 'url' as const, icon: '🔗' },
  { key: 'phone' as const, icon: '📞' }, { key: 'email' as const, icon: '📧' },
  { key: 'sms' as const, icon: '💬' }, { key: 'wifi' as const, icon: '📶' },
  { key: 'location' as const, icon: '📍' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const QR_SIZE = Math.min(SCREEN_WIDTH - 80, 250);
const IS_WEB = Platform.OS === 'web';

export function DesignerScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const viewShotRef = useRef<ViewShot>(null);
  const [dotStyle, setDotStyle] = useState<DotStyle>('square');
  const [eyeStyle, setEyeStyle] = useState<EyeStyle>('classic');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    type, setType, content, setContent,
    foregroundColor, setForegroundColor,
    backgroundColor, setBackgroundColor,
    size, setSize, border, setBorder,
    formattedContent,
  } = useQRGenerator();

  const handlePresetSelect = (preset: Preset) => {
    setForegroundColor(preset.fg);
    setBackgroundColor(preset.bg);
    setDotStyle(preset.dotStyle);
    setEyeStyle(preset.eyeStyle);
  };

  const handleSave = useCallback(async () => {
    if (!formattedContent.trim()) { Alert.alert('Error', 'Enter content first'); return; }
    const uri = await viewShotRef.current?.capture?.();
    if (uri && IS_WEB) {
      const a = document.createElement('a');
      a.href = uri;
      a.download = `QR_Design_${Date.now()}.png`;
      a.click();
      Alert.alert('Success', 'QR saved!');
    }
  }, [formattedContent]);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: IS_WEB ? 20 : insets.top, flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>🎨 QR Designer Pro</Text>
          <Text style={styles.subtitle}>Create stunning QR codes</Text>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
          
          {/* Type Selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={styles.chipsRow}>
            {QR_TYPES.map(({ key, icon }) => (
              <Chip key={key} label={`${icon} ${t.types[key]}`} selected={type === key} onPress={() => setType(key)} />
            ))}
          </ScrollView>

          {/* Input */}
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
            placeholder="Enter content here..."
            placeholderTextColor={colors.textTertiary}
            multiline={type === 'text'}
            numberOfLines={type === 'text' ? 3 : 1}
          />

          {/* QR Preview */}
          <View style={styles.qrBox}>
            <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
              <View style={styles.qrWrap}>
                <QRCode
                  value={formattedContent || 'QR Studio'}
                  size={QR_SIZE}
                  color={foregroundColor}
                  backgroundColor={backgroundColor}
                />
              </View>
            </ViewShot>
          </View>

          {/* Color Inputs */}
          <View style={styles.colorRow}>
            <View style={styles.colorItem}>
              <Text style={styles.colorLabel}>Foreground</Text>
              <input type="color" value={foregroundColor} onChange={(e) => setForegroundColor(e.target.value)} style={styles.colorInput} />
              <Text style={styles.hexCode}>{foregroundColor}</Text>
            </View>
            <View style={styles.colorItem}>
              <Text style={styles.colorLabel}>Background</Text>
              <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} style={styles.colorInput} />
              <Text style={styles.hexCode}>{backgroundColor}</Text>
            </View>
          </View>

          {/* Size & Border */}
          <View style={styles.sliderRow}>
            <Text style={styles.sliderLabel}>Size: {size}px</Text>
            <input type="range" min="150" max="350" value={size} onChange={(e) => setSize(Number(e.target.value))} style={{ flex: 1 }} />
          </View>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderLabel}>Border: {border}</Text>
            <input type="range" min="1" max="8" value={border} onChange={(e) => setBorder(Number(e.target.value))} style={{ flex: 1 }} />
          </View>

          {/* Presets */}
          <QRStylePresets selectedPreset="custom" onSelect={handlePresetSelect} />

          {/* Advanced Toggle */}
          <TouchableOpacity style={styles.toggleBtn} onPress={() => setShowAdvanced(!showAdvanced)}>
            <Text style={styles.toggleText}>{showAdvanced ? '🔽 Hide' : '▶️ Show'} Advanced</Text>
          </TouchableOpacity>

          {/* Advanced */}
          {showAdvanced && (
            <View style={{ gap: spacing.base }}>
              <QRPatternPicker selected={dotStyle} onSelect={setDotStyle} />
              <QREyePicker selected={eyeStyle} onSelect={setEyeStyle} />
            </View>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            <Button title="💾 Save QR" variant="primary" onPress={handleSave} fullWidth />
            <Button title="📤 Share" variant="secondary" onPress={handleSave} fullWidth />
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.base },
  title: { ...textStyles.h2, color: colors.textPrimary },
  subtitle: { ...textStyles.bodySmall, color: colors.textSecondary, marginTop: spacing.xxs },
  scroll: { flex: 1 },
  scrollInner: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl, gap: spacing.base },
  chipsRow: { gap: spacing.sm, paddingVertical: spacing.sm },
  input: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.lg, paddingHorizontal: spacing.base, paddingVertical: spacing.md,
    fontSize: 16, color: colors.textPrimary, ...shadows.sm,
  },
  qrBox: { alignItems: 'center' },
  qrWrap: { padding: spacing.lg, backgroundColor: colors.white, borderRadius: radius.xl, ...shadows.lg },
  colorRow: { flexDirection: 'row', gap: spacing.xl, justifyContent: 'center' },
  colorItem: { alignItems: 'center', gap: spacing.xs },
  colorLabel: { ...textStyles.caption, color: colors.textSecondary },
  colorInput: { width: 48, height: 48, border: 'none', cursor: 'pointer', borderRadius: 8 },
  hexCode: { ...textStyles.caption, color: colors.textTertiary, fontFamily: 'monospace' },
  sliderRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  sliderLabel: { ...textStyles.caption, color: colors.textSecondary, width: 80 },
  toggleBtn: { alignItems: 'center', paddingVertical: spacing.sm },
  toggleText: { ...textStyles.body, color: colors.primary[500] },
  actions: { gap: spacing.md },
});