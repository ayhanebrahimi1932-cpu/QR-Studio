import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/ui/Button';
import { ScannerFrame } from '../components/scanner/ScannerFrame';
import { colors, spacing, radius, textStyles } from '../theme';

export function ScanScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => { if (!permission?.granted) requestPermission(); }, []);

  const handleScan = ({ data }: { data: string }) => { if (scanned) return; setScanned(true); setResult(data); };
  const handleCopy = async () => { await Clipboard.setStringAsync(result); Alert.alert(t.common.success, t.alerts.copied); };
  const handleOpen = () => { if (result.startsWith('http')) Linking.openURL(result); else Alert.alert(t.scan.result, result); };
  const resetScan = () => { setScanned(false); setResult(''); };

  if (!permission?.granted) {
    return (
      <View style={styles.permContainer}>
        <Text style={styles.permIcon}>📷</Text>
        <Text style={styles.permTitle}>{t.scan.permission}</Text>
        <Button title={t.scan.grantPermission} onPress={requestPermission} variant="primary" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <CameraView style={styles.camera} facing="back" barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={handleScan}>
          <View style={styles.overlay}>
            <ScannerFrame />
            <Text style={styles.instruction}>{t.scan.instruction}</Text>
          </View>
        </CameraView>
      ) : (
        <View style={[styles.resultContainer, { paddingTop: insets.top }]}>
          <Text style={styles.resultTitle}>{t.scan.result}</Text>
          <View style={styles.resultBox}><Text style={styles.resultText} numberOfLines={5}>{result}</Text></View>
          <View style={styles.resultActions}>
            <Button title={t.scan.copy} onPress={handleCopy} variant="secondary" icon={<Text>📋</Text>} />
            <Button title={t.scan.open} onPress={handleOpen} variant="primary" icon={<Text>🔗</Text>} />
            <Button title={t.common.back} onPress={resetScan} variant="ghost" />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  permContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', gap: spacing.lg, padding: spacing.xl },
  permIcon: { fontSize: 64 },
  permTitle: { ...textStyles.h3, color: colors.textPrimary, textAlign: 'center' },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  instruction: { ...textStyles.body, color: colors.white, marginTop: spacing.xxl, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.full },
  resultContainer: { flex: 1, padding: spacing.lg, gap: spacing.lg, justifyContent: 'center' },
  resultTitle: { ...textStyles.h2, color: colors.textPrimary, textAlign: 'center' },
  resultBox: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  resultText: { ...textStyles.body, color: colors.textPrimary, textAlign: 'center' },
  resultActions: { gap: spacing.md },
});