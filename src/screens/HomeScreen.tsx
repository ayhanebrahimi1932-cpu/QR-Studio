import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../hooks/useLanguage';
import { useQRGenerator } from '../hooks/useQRGenerator';
import { Button } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { QRColorCustomizer } from '../components/qr/QRColorCustomizer';
import { QRLogoUploader } from '../components/qr/QRLogoUploader';
import { GreenBackground } from '../components/ui/GreenBackground';
import { colors, spacing, radius, shadows, textStyles } from '../theme';

const QR_TYPES = [
  { key: 'text' as const, icon: '📝' }, { key: 'url' as const, icon: '🔗' },
  { key: 'phone' as const, icon: '📞' }, { key: 'email' as const, icon: '📧' },
  { key: 'sms' as const, icon: '💬' }, { key: 'wifi' as const, icon: '📶' },
  { key: 'location' as const, icon: '📍' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const QR_SIZE = Math.min(SCREEN_WIDTH - 80, 280);
const IS_WEB = Platform.OS === 'web';

export function HomeScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const viewShotRef = useRef<ViewShot>(null);
  const [userName, setUserName] = useState('');
  const [showCustomize, setShowCustomize] = useState(false);
  const { type, setType, content, setContent, wifiPassword, setWifiPassword, foregroundColor, setForegroundColor, backgroundColor, setBackgroundColor, logoUri, setLogoUri, formattedContent } = useQRGenerator();

  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      if (data) { try { const user = JSON.parse(data); setUserName(user.firstName || ''); } catch(e) {} }
    });
  }, []);

  const saveToHistory = async () => {
    try {
      const history = JSON.parse(await AsyncStorage.getItem('qr_history') || '[]');
      history.unshift({
        id: Date.now().toString(),
        type,
        content: content.substring(0, 50),
        createdAt: new Date().toLocaleString(),
      });
      await AsyncStorage.setItem('qr_history', JSON.stringify(history.slice(0, 50)));
    } catch(e) {}
  };

  const handleSave = useCallback(async () => {
    if (!formattedContent.trim()) { Alert.alert('Error', 'Enter content first'); return; }
    
    await saveToHistory();

    if (IS_WEB) {
      try {
        const uri = await viewShotRef.current?.capture?.();
        if (uri) { const a = document.createElement('a'); a.href = uri; a.download = `QR_${Date.now()}.png`; a.click(); Alert.alert('Saved!', 'QR downloaded'); }
      } catch (e) { Alert.alert('Error', String(e)); }
      return;
    }
    try {
      const ML = require('expo-media-library/legacy');
      const { status } = await ML.requestPermissionsAsync();
      if (status !== 'granted') { Alert.alert('Error', 'Permission needed'); return; }
      const uri = await viewShotRef.current?.capture?.();
      if (uri) { await ML.saveToLibraryAsync(uri); Alert.alert('Saved!', 'QR saved to gallery'); }
    } catch (e) { Alert.alert('Error', String(e)); }
  }, [formattedContent, type, content]);

  const isValid = formattedContent.trim().length > 0;

  return (
    <View style={styles.container}>
      <GreenBackground />
      <View style={{ paddingTop: IS_WEB ? 20 : insets.top, flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hey, {userName || 'there'}! 👋</Text>
          <Text style={styles.subtitle}>Create & Scan QR Codes</Text>
        </View>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={styles.chipsRow}>
            {QR_TYPES.map(({ key, icon }) => <Chip key={key} label={`${icon} ${t.types[key]}`} selected={type === key} onPress={() => setType(key)} />)}
          </ScrollView>
          <View style={styles.inputBox}>
            <Text style={styles.label}>{type === 'wifi' ? 'Network Name (SSID)' : 'Content'}</Text>
            <TextInput style={styles.input} value={content} onChangeText={setContent} placeholder={type === 'wifi' ? 'MyWiFi' : 'Enter content...'} placeholderTextColor={colors.textTertiary} multiline={type === 'text'} numberOfLines={type === 'text' ? 4 : 1} />
          </View>
          {type === 'wifi' && (
            <View style={styles.inputBox}>
              <Text style={styles.label}>Password (empty = open)</Text>
              <TextInput style={styles.input} value={wifiPassword} onChangeText={setWifiPassword} placeholder="Leave empty for no password" placeholderTextColor={colors.textTertiary} />
            </View>
          )}
          <View style={styles.qrBox}>
            <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
              <View style={[styles.qrWrap, { backgroundColor }]}>
                <QRCode value={formattedContent || ' '} size={QR_SIZE} color={foregroundColor} backgroundColor={backgroundColor} logo={logoUri ? { uri: logoUri } : undefined} logoSize={logoUri ? 50 : 0} logoBackgroundColor={backgroundColor} logoBorderRadius={radius.md} />
              </View>
            </ViewShot>
            {!isValid && <View style={styles.qrOverlay}><Text style={styles.qrOverlayText}>QR Preview</Text></View>}
          </View>
          <Button title="🎨 Customize" variant="ghost" onPress={() => setShowCustomize(!showCustomize)} icon={<Text>{showCustomize ? '🔽' : '▶️'}</Text>} />
          {showCustomize && (
            <View style={styles.panel}>
              <QRColorCustomizer foregroundColor={foregroundColor} backgroundColor={backgroundColor} onForegroundChange={setForegroundColor} onBackgroundChange={setBackgroundColor} />
              {!IS_WEB && <QRLogoUploader logoUri={logoUri} onLogoChange={setLogoUri} />}
            </View>
          )}
          <View style={styles.actions}>
            <Button title="💾 Save QR" variant="primary" onPress={handleSave} disabled={!isValid} fullWidth />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.base },
  greeting: { ...textStyles.h2, color: colors.textPrimary },
  subtitle: { ...textStyles.bodySmall, color: colors.textSecondary, marginTop: spacing.xxs },
  scroll: { flex: 1 },
  scrollInner: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl },
  chipsRow: { gap: spacing.sm, paddingVertical: spacing.sm },
  inputBox: { marginTop: spacing.lg },
  label: { ...textStyles.bodySmall, color: colors.textSecondary, marginBottom: spacing.sm },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, paddingHorizontal: spacing.base, paddingVertical: spacing.md, fontSize: 16, color: colors.textPrimary, ...shadows.sm },
  qrBox: { marginTop: spacing.xl, alignItems: 'center', position: 'relative' },
  qrWrap: { padding: spacing.lg, borderRadius: radius.xl, ...shadows.lg },
  qrOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: radius.xl, alignItems: 'center', justifyContent: 'center' },
  qrOverlayText: { ...textStyles.h3, color: colors.textTertiary },
  panel: { marginTop: spacing.lg, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: radius.xl, padding: spacing.lg, gap: spacing.lg, ...shadows.md },
  actions: { marginTop: spacing.xl },
});