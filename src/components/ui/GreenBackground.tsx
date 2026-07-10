import React from 'react';
import { View, StyleSheet } from 'react-native';

export function GreenBackground() {
  return (
    <View style={styles.container}>
      {/* Orb 1 - Dark Green */}
      <View style={[styles.orb, { 
        backgroundColor: 'rgba(58, 90, 64, 0.15)',
        width: 300, height: 300,
        top: -80, left: -80,
      }]} />
      
      {/* Orb 2 - Light Green */}
      <View style={[styles.orb, { 
        backgroundColor: 'rgba(76, 175, 80, 0.12)',
        width: 250, height: 250,
        bottom: -60, right: -60,
      }]} />
      
      {/* Orb 3 - Mint */}
      <View style={[styles.orb, { 
        backgroundColor: 'rgba(129, 199, 132, 0.1)',
        width: 200, height: 200,
        top: '40%', left: '60%',
      }]} />
      
      {/* Glass overlay */}
      <View style={styles.glass} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E8F0E4',
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
  },
  glass: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});