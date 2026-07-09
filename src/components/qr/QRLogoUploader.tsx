import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, radius, textStyles } from '../../theme';

interface QRLogoUploaderProps {
  logoUri?: string;
  onLogoChange: (uri?: string) => void;
}

export function QRLogoUploader({ logoUri, onLogoChange }: QRLogoUploaderProps) {
  const pickLogo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Gallery permission is required');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onLogoChange(result.assets[0].uri);
    }
  };

  const removeLogo = () => {
    onLogoChange(undefined);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Center Logo</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.uploadBtn} onPress={pickLogo}>
          {logoUri ? (
            <Image source={{ uri: logoUri }} style={styles.logo} />
          ) : (
            <Text style={styles.uploadText}>+</Text>
          )}
        </TouchableOpacity>
        {logoUri && (
          <TouchableOpacity onPress={removeLogo}>
            <Text style={styles.removeText}>✕ Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  label: {
    ...textStyles.bodySmall,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
  },
  uploadBtn: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    overflow: 'hidden',
  },
  uploadText: {
    fontSize: 28,
    color: colors.textTertiary,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeText: {
    ...textStyles.bodySmall,
    color: colors.error,
  },
});