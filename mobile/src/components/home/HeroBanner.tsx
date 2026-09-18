import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onSubmitSearch: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  onSearchChange,
  onSubmitSearch,
}) => {
  return (
    <View style={styles.bannerContainer}>
      {/* Background Gold Accent Ring */}
      <View style={styles.goldRingOverlay} />

      <View style={styles.headerBadge}>
        <Ionicons name="sparkles" size={12} color="#1c1917" />
        <Text style={styles.headerBadgeText}>BENGALURU WEDDING DIRECTORY</Text>
      </View>

      <Text style={styles.mainHeading}>
        Find Your Dream Wedding Venue 💍
      </Text>
      <Text style={styles.subHeading}>
        Discover heritage kalyana mantapas, royal banquet halls, and luxury convention resorts with verified pricing.
      </Text>

      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by venue name, area, or style..."
          placeholderTextColor={Colors.textLight}
          value={searchQuery}
          onChangeText={onSearchChange}
          onSubmitEditing={onSubmitSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 ? (
          <TouchableOpacity onPress={() => onSearchChange('')} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={18} color={Colors.textLight} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity style={styles.searchActionBtn} onPress={onSubmitSearch}>
          <Ionicons name="arrow-forward" size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  goldRingOverlay: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 10,
  },
  headerBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1c1917',
    letterSpacing: 0.8,
  },
  mainHeading: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 28,
    marginBottom: 6,
  },
  subHeading: {
    fontSize: 13,
    color: '#fce7f3',
    lineHeight: 18,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  clearBtn: {
    padding: 6,
  },
  searchActionBtn: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
});

