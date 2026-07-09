import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { colors } from '../../theme';

const { width, height } = Dimensions.get('window');

const IS_WEB = Platform.OS === 'web';

export function AnimatedBackground() {
  const move1 = useRef(new Animated.Value(0)).current;
  const move2 = useRef(new Animated.Value(0)).current;
  const move3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim1 = Animated.loop(
      Animated.sequence([
        Animated.timing(move1, { toValue: 1, duration: 20000, useNativeDriver: true }),
        Animated.timing(move1, { toValue: 0, duration: 20000, useNativeDriver: true }),
      ])
    );
    const anim2 = Animated.loop(
      Animated.sequence([
        Animated.timing(move2, { toValue: 1, duration: 25000, useNativeDriver: true }),
        Animated.timing(move2, { toValue: 0, duration: 25000, useNativeDriver: true }),
      ])
    );
    const anim3 = Animated.loop(
      Animated.sequence([
        Animated.timing(move3, { toValue: 1, duration: 30000, useNativeDriver: true }),
        Animated.timing(move3, { toValue: 0, duration: 30000, useNativeDriver: true }),
      ])
    );

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  const translateX1 = move1.interpolate({ inputRange: [0, 1], outputRange: [-50, 50] });
  const translateY1 = move1.interpolate({ inputRange: [0, 1], outputRange: [-30, 30] });

  const translateX2 = move2.interpolate({ inputRange: [0, 1], outputRange: [40, -40] });
  const translateY2 = move2.interpolate({ inputRange: [0, 1], outputRange: [20, -20] });

  const translateX3 = move3.interpolate({ inputRange: [0, 1], outputRange: [-30, 30] });
  const translateY3 = move3.interpolate({ inputRange: [0, 1], outputRange: [-40, 40] });

  return (
    <View style={styles.container}>
      {/* Orb 1 - Soft green */}
      <Animated.View
        style={[
          styles.orb,
          styles.orb1,
          { transform: [{ translateX: translateX1 }, { translateY: translateY1 }] },
        ]}
      />
      {/* Orb 2 - Soft gold */}
      <Animated.View
        style={[
          styles.orb,
          styles.orb2,
          { transform: [{ translateX: translateX2 }, { translateY: translateY2 }] },
        ]}
      />
      {/* Orb 3 - Soft teal */}
      <Animated.View
        style={[
          styles.orb,
          styles.orb3,
          { transform: [{ translateX: translateX3 }, { translateY: translateY3 }] },
        ]}
      />
      {/* Glass overlay */}
      <View style={styles.glass} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#F0F4F0',
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.4,
    filter: IS_WEB ? 'blur(60px)' : undefined,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: '#A8D5BA',
    top: -50,
    left: -50,
  },
  orb2: {
    width: 250,
    height: 250,
    backgroundColor: '#E8D5B7',
    bottom: -50,
    right: -50,
  },
  orb3: {
    width: 200,
    height: 200,
    backgroundColor: '#B8D5CD',
    top: '40%',
    left: '50%',
    marginLeft: -100,
    marginTop: -100,
  },
  glass: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: IS_WEB ? 'blur(10px)' : undefined,
  },
});