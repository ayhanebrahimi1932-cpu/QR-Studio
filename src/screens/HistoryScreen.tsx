import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '../components/ui/EmptyState';
import { Card } from '../components/ui/Card';
import { colors, spacing, textStyles } from '../theme';

export function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('qr_history');
    if (data) setHistory(JSON.parse(data));
  }, []);

  const saveToHistory = (item: any) => {
    const updated = [item, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem('qr_history', JSON.stringify(updated));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>📋 History</Text>
      {history.length === 0 ? (
        <EmptyState icon="📭" title="No QR codes yet" description="Create your first QR!" />
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.content} numberOfLines={1}>{item.content}</Text>
              <Text style={styles.date}>{item.createdAt}</Text>
            </Card>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { ...textStyles.h2, color: colors.textPrimary, paddingHorizontal: spacing.lg, paddingVertical: spacing.base },
  list: { paddingHorizontal: spacing.lg, gap: spacing.md },
  card: { gap: spacing.xs },
  type: { ...textStyles.caption, color: colors.primary[500] },
  content: { ...textStyles.body, color: colors.textPrimary },
  date: { ...textStyles.caption, color: colors.textTertiary },
});