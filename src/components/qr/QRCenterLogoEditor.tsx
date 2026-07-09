import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, radius, textStyles } from '../../theme';

interface QRCenterLogoEditorProps {
  logoUri?: string;
  logoSize: number;
  logoShape: 'circle' | 'square';
  logoBorder: number;
  onLogoChange: (uri?: string) => void;
  onLogoSizeChange: (size: number) => void;
  onLogoShapeChange: (shape: 'circle' | 'square') => void;
  onLogoBorderChange: (border: number) => void;
}

export function QRCenterLogoEditor({
  logoUri, logoSize, logoShape, logoBorder,
  onLogoChange, onLogoSizeChange, onLogoShapeChange, onLogoBorderChange,
}: QRCenterLogoEditorProps) {
  
  const pickLogo = async (fromCamera: boolean) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permission.status !== 'granted') {
      Alert.alert('Permission needed');
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1,1], quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1,1], quality: 1 });

    if (!result.canceled) onLogoChange(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🖼 Center Logo</Text>
      
      <View style={styles.row}>
        <TouchableOpacity style={styles.uploadBtn} onPress={() => pickLogo(false)}>
          {logoUri ? <Image source={{ uri: logoUri }} style={styles.preview} /> : <Text style={styles.plus}>+</Text>}
        </TouchableOpacity>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.smallBtn} onPress={() => pickLogo(true)}>
            <Text>📷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallBtn} onPress={() => pickLogo(false)}>
            <Text>🖼</Text>
          </TouchableOpacity>
          {logoUri && (
            <TouchableOpacity style={styles.smallBtn} onPress={() => onLogoChange(undefined)}>
              <Text>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.sliderRow}>
        <Text style={styles.label}>Size: {logoSize}%</Text>
        <input type="range" min="10" max="60" value={logoSize} onChange={(e) => onLogoSizeChange(Number(e.target.value))} style={{ flex: 1 }} />
      </View>

      <View style={styles.shapeRow}>
        <TouchableOpacity style={[styles.shapeBtn, logoShape === 'circle' && styles.activeBtn]} onPress={() => onLogoShapeChange('circle')}>
          <Text>◯ Circle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.shapeBtn, logoShape === 'square' && styles.activeBtn]} onPress={() => onLogoShapeChange('square')}>
          <Text>▢ Square</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderRow}>
        <Text style={styles.label}>Border: {logoBorder}px</Text>
        <input type="range" min="0" max="10" value={logoBorder} onChange={(e) => onLogoBorderChange(Number(e.target.value))} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  title: { ...textStyles.bodySmall, color: colors.textSecondary },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.base },
  uploadBtn: {
    width: 80, height: 80,
    borderRadius: radius.lg,
    borderWidth: 2, borderColor: colors.border, borderStyle: 'dashed',
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    overflow: 'hidden',
  },
  plus: { fontSize: 32, color: colors.textTertiary },
  preview: { width: '100%', height: '100%', resizeMode: 'cover' },
  controls: { gap: spacing.sm },
  smallBtn: {
    width: 36, height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center', alignItems: 'center',
  },
  sliderRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { ...textStyles.caption, color: colors.textSecondary, width: 70 },
  shapeRow: { flexDirection: 'row', gap: spacing.sm },
  shapeBtn: {
    flex: 1, paddingVertical: spacing.sm,
    borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.borderLight,
    alignItems: 'center',
  },
  activeBtn: { borderColor: colors.primary[500], backgroundColor: colors.primary[50] },
});