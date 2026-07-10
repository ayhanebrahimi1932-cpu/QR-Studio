import React from 'react';
import { View, StyleSheet } from 'react-native';

export function GreenBackground() {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: '#3A5A40', width: 350, height: 350, top: -100, right: -100, opacity: 0.08 }]} />
      <View style={[styles.circle, { backgroundColor: '#4CAF50', width: 250, height: 250, bottom: -80, left: -80, opacity: 0.06 }]} />
      <View style={[styles.circle, { backgroundColor: '#81C784', width: 200, height: 200, top: '30%', left: '50%', opacity: 0.05 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#D4E8D0',
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
  },
});