import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius } from '../../theme';

export function ScannerFrame() {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
    </View>
  );
}

const CORNER_SIZE = 30;
const CORNER_THICK = 4;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_THICK,
    borderLeftWidth: CORNER_THICK,
    borderColor: colors.accent[400],
    borderTopLeftRadius: radius.md,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_THICK,
    borderRightWidth: CORNER_THICK,
    borderColor: colors.accent[400],
    borderTopRightRadius: radius.md,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_THICK,
    borderLeftWidth: CORNER_THICK,
    borderColor: colors.accent[400],
    borderBottomLeftRadius: radius.md,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_THICK,
    borderRightWidth: CORNER_THICK,
    borderColor: colors.accent[400],
    borderBottomRightRadius: radius.md,
  },
});