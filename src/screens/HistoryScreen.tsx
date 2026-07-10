import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmptyState } from '../components/ui/EmptyState';
import { Card } from '../components/ui/Card';
import { GreenBackground } from '../components/ui/GreenBackground';
import { colors, spacing, textStyles } from '../theme';

export function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const [history, setHistory] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('qr_history').then(data => {
        if (data) setHistory(JSON.parse(data));
      });
    }, [])
  );

  if (history.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <GreenBackground />
        <Text style={styles.title}>📋 History</Text>
        <EmptyState icon="📭" title="No QR codes yet" description="Create your first QR!" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <GreenBackground />
      <Text style={styles.title}>📋 History</Text>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.cardType}>{item.type}</Text>
            <Text style={styles.cardContent} numberOfLines={1}>{item.content}</Text>
            <Text style={styles.cardDate}>{item.createdAt}</Text>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  title: { ...textStyles.h2, color: colors.textPrimary, paddingHorizontal: spacing.lg, paddingVertical: spacing.base },
  list: { paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  card: { gap: spacing.xs },
  cardType: { ...textStyles.caption, color: colors.primary[500] },
  cardContent: { ...textStyles.body, color: colors.textPrimary },
  cardDate: { ...textStyles.caption, color: colors.textTertiary },
});