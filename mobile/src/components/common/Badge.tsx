import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

interface BadgeProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  type?: 'primary' | 'gold' | 'veg' | 'nonveg' | 'rating' | 'muted';
  size?: 'small' | 'medium';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  icon,
  type = 'muted',
  size = 'small',
}) => {
  return (
    <View
      style={[
        styles.badge,
        size === 'medium' && styles.badgeMedium,
        type === 'primary' && styles.badgePrimary,
        type === 'gold' && styles.badgeGold,
        type === 'veg' && styles.badgeVeg,
        type === 'nonveg' && styles.badgeNonVeg,
        type === 'rating' && styles.badgeRating,
        type === 'muted' && styles.badgeMuted,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={size === 'medium' ? 14 : 12}
          color={
            type === 'primary'
              ? Colors.primary
              : type === 'gold'
              ? Colors.goldDark
              : type === 'veg'
              ? Colors.emerald
              : type === 'rating'
              ? '#b45309'
              : Colors.textSecondary
          }
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.text,
          size === 'medium' && styles.textMedium,
          type === 'primary' && styles.textPrimary,
          type === 'gold' && styles.textGold,
          type === 'veg' && styles.textVeg,
          type === 'nonveg' && styles.textNonVeg,
          type === 'rating' && styles.textRating,
          type === 'muted' && styles.textMuted,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  badgeMedium: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
  textMedium: {
    fontSize: 12,
  },
  badgeMuted: {
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textMuted: {
    color: Colors.textSecondary,
  },
  badgePrimary: {
    backgroundColor: '#ffe4e6',
  },
  textPrimary: {
    color: Colors.primary,
  },
  badgeGold: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  textGold: {
    color: Colors.goldDark,
  },
  badgeVeg: {
    backgroundColor: Colors.emeraldLight,
  },
  textVeg: {
    color: Colors.emerald,
  },
  badgeNonVeg: {
    backgroundColor: '#fef2f2',
  },
  textNonVeg: {
    color: '#991b1b',
  },
  badgeRating: {
    backgroundColor: '#fef3c7',
  },
  textRating: {
    color: '#b45309',
  },
});

