import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

interface SplashProps { onFinish: () => void; }

export function SplashScreen({ onFinish }: SplashProps) {
  const scale = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1, tension: 5, friction: 3, useNativeDriver: true }),
      Animated.delay(1800),
      Animated.timing(fade, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fade }]}>
      <Animated.View style={[styles.content, { transform: [{ scale }] }]}>
        <Text style={styles.logo}>📱</Text>
        <Text style={styles.title}>QR Studio</Text>
        <Text style={styles.subtitle}>Professional QR Generator</Text>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: '#00FF88' }]} />
          <View style={[styles.dot, { backgroundColor: '#FFD700' }]} />
          <View style={[styles.dot, { backgroundColor: '#00BFFF' }]} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#1A1A2E', position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
  },
  content: { alignItems: 'center', gap: 16 },
  logo: { fontSize: 72 },
  title: { fontSize: 38, fontWeight: '700', color: '#FFFFFF', letterSpacing: 3 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.7)' },
  dots: { flexDirection: 'row', gap: 10, marginTop: 20 },
  dot: { width: 12, height: 12, borderRadius: 6 },
});