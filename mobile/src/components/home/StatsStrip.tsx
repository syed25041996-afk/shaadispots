import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

export const StatsStrip: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <View style={[styles.iconWrap, { backgroundColor: '#ffe4e6' }]}>
          <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
        </View>
        <Text style={styles.statNumber}>250+ Venues</Text>
        <Text style={styles.statLabel}>100% Verified</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statItem}>
        <View style={[styles.iconWrap, { backgroundColor: '#fef3c7' }]}>
          <Ionicons name="people" size={16} color={Colors.goldDark} />
        </View>
        <Text style={styles.statNumber}>15,000+</Text>
        <Text style={styles.statLabel}>Couples Guided</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statItem}>
        <View style={[styles.iconWrap, { backgroundColor: '#d1fae5' }]}>
          <Ionicons name="headset" size={16} color={Colors.emerald} />
        </View>
        <Text style={styles.statNumber}>Free Help</Text>
        <Text style={styles.statLabel}>Concierge Desk</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.divider,
  },
});

