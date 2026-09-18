import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Hall } from '../types/hall';
import { hallService } from '../services/hallService';
import { useShortlist } from '../context/ShortlistContext';
import { useToast } from '../context/ToastContext';
import { Colors } from '../theme/colors';
import { Header } from '../components/common/Header';
import { HallCard } from '../components/halls/HallCard';
import { EmptyState } from '../components/common/EmptyState';

export const ShortlistScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { shortlist, clearShortlist } = useShortlist();
  const { showToast } = useToast();
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);

  const loadShortlistedHalls = useCallback(async () => {
    setLoading(true);
    const all = await hallService.getAllHalls();
    const saved = all.filter((h) => shortlist.includes(h.id));
    setHalls(saved);
    setLoading(false);
  }, [shortlist]);

  useFocusEffect(
    useCallback(() => {
      loadShortlistedHalls();
    }, [loadShortlistedHalls])
  );

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Shortlisted Venues',
      'Are you sure you want to remove all saved venues from your shortlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearShortlist();
            showToast('All saved venues removed', { type: 'info' });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header
        title="Saved Venues"
        subtitle={
          shortlist.length === 1
            ? '1 favorite wedding venue'
            : `${shortlist.length} favorite wedding venues`
        }
      />

      {shortlist.length > 0 && (
        <View style={styles.statusBar}>
          <View style={styles.countBadge}>
            <Ionicons name="heart" size={14} color={Colors.rose} />
            <Text style={styles.countText}>
              {shortlist.length} {shortlist.length === 1 ? 'Venue' : 'Venues'} Shortlisted
            </Text>
          </View>
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleClearAll}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Fetching your saved venues...</Text>
        </View>
      ) : shortlist.length === 0 ? (
        <View style={styles.emptyWrap}>
          <EmptyState
            icon="heart-outline"
            title="Your Shortlist is Empty"
            description="Tap the heart icon on any wedding venue to save and compare pricing, guest capacity, and amenities side-by-side."
            buttonTitle="Discover Royal Venues"
            onButtonPress={() => navigation.navigate('Listings')}
          />
        </View>
      ) : (
        <FlatList
          data={halls}
          keyExtractor={(item: Hall) => `shortlist-${item.id}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: Hall }) => (
            <HallCard
              hall={item}
              onPress={() => navigation.navigate('HallDetail', { hallId: item.id })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.card,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  countText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: Colors.surfaceSecondary,
  },
  clearText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
    backgroundColor: Colors.background,
  },
  emptyWrap: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
