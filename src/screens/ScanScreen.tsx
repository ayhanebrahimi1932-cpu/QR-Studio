import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Linking, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import { Button } from '../components/ui/Button';
import { ScannerFrame } from '../components/scanner/ScannerFrame';
import { GreenBackground } from '../components/ui/GreenBackground';
import { colors, spacing, radius, textStyles } from '../theme';

export function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  const handleScan = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    setResult(data);
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(result);
    Alert.alert('Copied!', result);
  };

  const handleOpen = () => {
    if (result.startsWith('http')) Linking.openURL(result);
    else Alert.alert('Result', result);
  };

  const resetScan = () => {
    setScanned(false);
    setResult('');
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permContainer}>
        <GreenBackground />
        <Text style={styles.permIcon}>📷</Text>
        <Text style={styles.permTitle}>Camera permission needed</Text>
        <Button title="Grant Permission" onPress={requestPermission} variant="primary" />
      </View>
    );
  }

  if (scanned) {
    return (
      <View style={styles.resultContainer}>
        <GreenBackground />
        <TouchableOpacity onPress={resetScan} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.resultTitle}>Scan Result</Text>
        <View style={styles.resultBox}>
          <Text style={styles.resultText} numberOfLines={5}>{result}</Text>
        </View>
        <View style={styles.resultActions}>
          <Button title="📋 Copy" onPress={handleCopy} variant="secondary" />
          <Button title="🔗 Open" onPress={handleOpen} variant="primary" />
          <Button title="🔄 Scan Again" onPress={resetScan} variant="ghost" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={handleScan}
      >
        <View style={styles.overlay}>
          <ScannerFrame />
          <Text style={styles.instruction}>Point camera at QR code</Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  instruction: { color: 'white', marginTop: 50, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, fontSize: 14 },
  permContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, padding: 40 },
  permIcon: { fontSize: 64 },
  permTitle: { fontSize: 18, color: colors.textPrimary, textAlign: 'center' },
  resultContainer: { flex: 1, padding: 24, gap: 16, justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, zIndex: 10 },
  backText: { color: 'white', fontWeight: '600', fontSize: 14 },
  resultTitle: { fontSize: 24, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  resultBox: { backgroundColor: 'white', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E0E0E0' },
  resultText: { fontSize: 16, color: colors.textPrimary, textAlign: 'center' },
  resultActions: { gap: 12 },
});