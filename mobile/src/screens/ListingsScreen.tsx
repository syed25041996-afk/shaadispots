import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Hall, HallFilters } from '../types/hall';
import { hallService } from '../services/hallService';
import { Colors } from '../theme/colors';
import { Header } from '../components/common/Header';
import { HallCard } from '../components/halls/HallCard';
import { HallFiltersModal } from '../components/halls/HallFiltersModal';
import { EmptyState } from '../components/common/EmptyState';

export const ListingsScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const initialSearch = route.params?.initialSearch || '';
  const initialArea = route.params?.initialArea;

  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState<HallFilters>({
    search: initialSearch,
    area: initialArea,
    sortBy: 'rating-desc',
  });
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  const fetchHalls = useCallback(async (currentFilters: HallFilters) => {
    setLoading(true);
    const data = await hallService.getAllHalls(currentFilters);
    setHalls(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHalls(filters);
  }, [filters, fetchHalls]);

  // Update search with debounce or submit
  const handleSearchSubmit = () => {
    setFilters((prev) => ({ ...prev, search: search.trim() }));
  };

  const handleApplyFilters = (newFilters: HallFilters) => {
    setFilters({ ...newFilters, search: search.trim() });
  };

  const handleSelectSort = (sortBy: HallFilters['sortBy']) => {
    setFilters((prev) => ({ ...prev, sortBy }));
    setSortMenuVisible(false);
  };

  // Count active non-default filters
  const activeFilterCount = [
    filters.area && filters.area !== 'All Areas',
    filters.maxPricePerDay !== undefined,
    filters.minCapacity !== undefined,
    filters.vegOnly,
    filters.isAC,
    filters.hasParking,
    filters.hasRooms,
  ].filter(Boolean).length;

  const removeFilter = (key: keyof HallFilters) => {
    setFilters((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header title="All Wedding Venues" subtitle="Bengaluru, Karnataka" />

      {/* Search & Filter Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={17} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hall name or area..."
            placeholderTextColor={Colors.textLight}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearch('');
                setFilters((prev) => ({ ...prev, search: '' }));
              }}
              style={styles.clearBtn}
            >
              <Ionicons name="close-circle" size={16} color={Colors.textLight} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Trigger Button */}
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilterCount > 0 && styles.filterButtonActive,
          ]}
          onPress={() => setFilterModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons
            name="options"
            size={18}
            color={activeFilterCount > 0 ? '#ffffff' : Colors.textPrimary}
          />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Active Filter Chips & Sort Controls */}
      <View style={styles.filterRow}>
        <Text style={styles.resultCount}>
          {halls.length} {halls.length === 1 ? 'Venue' : 'Venues'} found
        </Text>

        {/* Sort Selector Button */}
        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() => setSortMenuVisible((prev) => !prev)}
          activeOpacity={0.8}
        >
          <Ionicons name="swap-vertical" size={14} color={Colors.primary} />
          <Text style={styles.sortText}>
            {filters.sortBy === 'price-asc'
              ? 'Price: Low-High'
              : filters.sortBy === 'price-desc'
              ? 'Price: High-Low'
              : filters.sortBy === 'capacity-desc'
              ? 'Capacity: Max'
              : 'Top Rated'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sort Menu Dropdown */}
      {sortMenuVisible && (
        <View style={styles.sortDropdown}>
          <TouchableOpacity
            style={styles.sortItem}
            onPress={() => handleSelectSort('rating-desc')}
          >
            <Text
              style={[
                styles.sortItemText,
                filters.sortBy === 'rating-desc' && styles.sortItemTextActive,
              ]}
            >
              Top Rated First ★
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortItem}
            onPress={() => handleSelectSort('price-asc')}
          >
            <Text
              style={[
                styles.sortItemText,
                filters.sortBy === 'price-asc' && styles.sortItemTextActive,
              ]}
            >
              Price: Lowest First
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortItem}
            onPress={() => handleSelectSort('price-desc')}
          >
            <Text
              style={[
                styles.sortItemText,
                filters.sortBy === 'price-desc' && styles.sortItemTextActive,
              ]}
            >
              Price: Highest First
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortItem}
            onPress={() => handleSelectSort('capacity-desc')}
          >
            <Text
              style={[
                styles.sortItemText,
                filters.sortBy === 'capacity-desc' && styles.sortItemTextActive,
              ]}
            >
              Capacity: Largest First
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Active Filter Chips Pills */}
      {activeFilterCount > 0 && (
        <View style={styles.activeChipsContainer}>
          {filters.area && filters.area !== 'All Areas' && (
            <TouchableOpacity
              style={styles.activeChip}
              onPress={() => removeFilter('area')}
            >
              <Text style={styles.activeChipText}>{filters.area}</Text>
              <Ionicons name="close" size={12} color="#ffffff" />
            </TouchableOpacity>
          )}
          {filters.vegOnly && (
            <TouchableOpacity
              style={styles.activeChip}
              onPress={() => removeFilter('vegOnly')}
            >
              <Text style={styles.activeChipText}>Pure Veg</Text>
              <Ionicons name="close" size={12} color="#ffffff" />
            </TouchableOpacity>
          )}
          {filters.isAC && (
            <TouchableOpacity
              style={styles.activeChip}
              onPress={() => removeFilter('isAC')}
            >
              <Text style={styles.activeChipText}>AC</Text>
              <Ionicons name="close" size={12} color="#ffffff" />
            </TouchableOpacity>
          )}
          {filters.hasParking && (
            <TouchableOpacity
              style={styles.activeChip}
              onPress={() => removeFilter('hasParking')}
            >
              <Text style={styles.activeChipText}>Parking</Text>
              <Ionicons name="close" size={12} color="#ffffff" />
            </TouchableOpacity>
          )}
          {filters.maxPricePerDay && (
            <TouchableOpacity
              style={styles.activeChip}
              onPress={() => removeFilter('maxPricePerDay')}
            >
              <Text style={styles.activeChipText}>
                ≤ ₹{filters.maxPricePerDay / 100000}L
              </Text>
              <Ionicons name="close" size={12} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Main Venues List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Fetching luxury venues...</Text>
        </View>
      ) : (
        <FlatList
          data={halls}
          keyExtractor={(item: Hall) => `list-${item.id}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onRefresh={() => fetchHalls(filters)}
          refreshing={loading}
          renderItem={({ item }: { item: Hall }) => (
            <HallCard
              hall={item}
              onPress={() =>
                navigation.navigate('HallDetail', { hallId: item.id })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="search"
              title="No Venues Match Your Filters"
              description="Try clearing your budget or locality filters to discover more celebration halls across Bengaluru."
              buttonTitle="Reset All Filters"
              onButtonPress={() => {
                setSearch('');
                setFilters({ sortBy: 'rating-desc' });
              }}
            />
          }
        />
      )}

      {/* Filter Bottom Sheet Modal */}
      <HallFiltersModal
        visible={filterModalVisible}
        filters={filters}
        onApply={handleApplyFilters}
        onClose={() => setFilterModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.card,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: Colors.card,
  },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 13,
    color: Colors.textPrimary,
    marginLeft: 6,
  },
  clearBtn: {
    padding: 4,
  },
  filterButton: {
    width: 44,
    height: 42,
    borderRadius: 14,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.gold,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1c1917',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  resultCount: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  sortText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  sortDropdown: {
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginTop: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 100,
  },
  sortItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sortItemText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  sortItemTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  activeChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.background,
    gap: 6,
  },
  activeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  activeChipText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingBottom: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
