import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
}) => {
  const handleCallConcierge = () => {
    Linking.openURL('tel:+919845011223').catch((err) =>
      console.warn('Failed to dial:', err)
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.primary} />
          </TouchableOpacity>
        ) : null}

        {title ? (
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        ) : (
          <View>
            <View style={styles.brandRow}>
              <Text style={styles.brandMain}>Shaadi</Text>
              <Text style={styles.brandAccent}>Spots</Text>
              <Text style={styles.ringEmoji}>💍</Text>
            </View>
            <Text style={styles.locationTag}>Bengaluru Venues</Text>
          </View>
        )}
      </View>

      <View style={styles.rightContainer}>
        {rightAction ? (
          rightAction
        ) : (
          <TouchableOpacity
            style={styles.conciergeButton}
            onPress={handleCallConcierge}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={15} color={Colors.goldDark} />
            <Text style={styles.conciergeText}>Concierge</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: Colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 6,
    marginRight: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandMain: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  brandAccent: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '800',
    color: Colors.goldDark,
  },
  ringEmoji: {
    fontSize: 16,
    marginLeft: 4,
  },
  locationTag: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginTop: -2,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conciergeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  conciergeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.goldDark,
    marginLeft: 4,
  },
});

