import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Hall } from '../../types/hall';
import { Colors } from '../../theme/colors';

interface HallSpecsGridProps {
  hall: Hall;
}

export const HallSpecsGrid: React.FC<HallSpecsGridProps> = ({ hall }) => {
  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(price % 100000 === 0 ? 0 : 1)} Lakh`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <View style={styles.container}>
      {/* 4 Primary Metric Cards */}
      <View style={styles.grid}>
        {/* Card 1: Guest Capacity */}
        <View style={styles.card}>
          <View style={[styles.iconWrap, { backgroundColor: '#ffe4e6' }]}>
            <Ionicons name="people" size={18} color={Colors.primary} />
          </View>
          <Text style={styles.cardLabel}>Guest Capacity</Text>
          <Text style={styles.cardValue}>
            {hall.capacityMin} - {hall.capacityMax}
          </Text>
          <Text style={styles.cardSub}>Floating Guests</Text>
        </View>

        {/* Card 2: Price Per Day */}
        <View style={styles.card}>
          <View style={[styles.iconWrap, { backgroundColor: '#fef3c7' }]}>
            <Ionicons name="cash" size={18} color={Colors.goldDark} />
          </View>
          <Text style={styles.cardLabel}>Rent / Day</Text>
          <Text style={styles.cardValue}>{formatPrice(hall.pricePerDay)}</Text>
          <Text style={styles.cardSub}>Base Hall Rental</Text>
        </View>

        {/* Card 3: Price Per Plate */}
        <View style={styles.card}>
          <View style={[styles.iconWrap, { backgroundColor: '#d1fae5' }]}>
            <Ionicons name="restaurant" size={18} color={Colors.emerald} />
          </View>
          <Text style={styles.cardLabel}>Per Plate</Text>
          <Text style={styles.cardValue}>₹{hall.pricePerPlate}</Text>
          <Text style={styles.cardSub}>Standard Menu</Text>
        </View>

        {/* Card 4: Verified Rating & Reviews */}
        <View style={styles.card}>
          <View style={[styles.iconWrap, { backgroundColor: '#fef3c7' }]}>
            <Ionicons name="star" size={18} color="#b45309" />
          </View>
          <Text style={styles.cardLabel}>Rating & Reviews</Text>
          <Text style={styles.cardValue}>{hall.rating} ★</Text>
          <Text style={styles.cardSub}>
            {hall.reviewCount.toLocaleString('en-IN')} Google Reviews
          </Text>
        </View>
      </View>

      {/* Highlights List */}
      <View style={styles.highlightsContainer}>
        <View style={styles.highlightItem}>
          <Ionicons
            name={hall.isAC ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={hall.isAC ? Colors.emerald : '#9ca3af'}
          />
          <Text style={styles.highlightText}>
            {hall.isAC ? 'Central Air Conditioning' : 'Non-AC Hall'}
          </Text>
        </View>

        <View style={styles.highlightItem}>
          <Ionicons
            name={hall.hasParking ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={hall.hasParking ? Colors.emerald : '#9ca3af'}
          />
          <Text style={styles.highlightText}>
            {hall.hasParking ? 'Guarded Valet Parking' : 'Street Parking'}
          </Text>
        </View>

        <View style={styles.highlightItem}>
          <Ionicons
            name={hall.hasRooms ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={hall.hasRooms ? Colors.emerald : '#9ca3af'}
          />
          <Text style={styles.highlightText}>
            {hall.hasRooms ? 'Guest Suites Available' : 'No Guest Rooms'}
          </Text>
        </View>

        <View style={styles.highlightItem}>
          <Ionicons
            name={hall.vegOnly ? 'leaf' : 'restaurant'}
            size={16}
            color={hall.vegOnly ? Colors.emerald : Colors.primary}
          />
          <Text style={styles.highlightText}>
            {hall.vegOnly ? '100% Pure Vegetarian' : 'Veg & Non-Veg Permitted'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    minWidth: '46%',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 10,
    color: Colors.textLight,
  },
  highlightsContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlightText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
});

