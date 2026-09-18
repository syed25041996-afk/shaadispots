import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Hall } from '../../types/hall';
import { Colors } from '../../theme/colors';
import { Badge } from '../common/Badge';
import { SafeImage } from '../common/SafeImage';
import { useShortlist } from '../../context/ShortlistContext';
import { useToast } from '../../context/ToastContext';

interface HallCardProps {
  hall: Hall;
  onPress: () => void;
  featuredOnly?: boolean;
}

export const HallCard: React.FC<HallCardProps> = ({ hall, onPress }) => {
  const { isShortlisted, toggleShortlist } = useShortlist();
  const { showToast } = useToast();
  const saved = isShortlisted(hall.id);

  const handleToggleSave = (e: any) => {
    e.stopPropagation?.();
    toggleShortlist(hall.id);
    showToast(
      saved ? `Removed ${hall.name} from shortlist` : `Saved ${hall.name} to shortlist!`,
      { type: saved ? 'info' : 'success' }
    );
  };

  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(price % 100000 === 0 ? 0 : 1)} Lakh`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {/* Venue Image Banner */}
      <View style={styles.imageContainer}>
        <SafeImage
          source={{ uri: hall.images[0] }}
          containerStyle={styles.image}
          style={styles.image}
          resizeMode="cover"
          photoCount={hall.images.length}
        />

        {/* Top Badges Over Image */}
        <View style={styles.imageOverlayTop}>
          {hall.featured ? (
            <View style={styles.featuredBadge}>
              <Ionicons name="sparkles" size={11} color="#1c1917" />
              <Text style={styles.featuredText}>ROYAL PICK</Text>
            </View>
          ) : (
            <View />
          )}

          {/* Heart / Save Button */}
          <TouchableOpacity
            style={[styles.heartButton, saved && styles.heartButtonSaved]}
            onPress={handleToggleSave}
            activeOpacity={0.8}
          >
            <Ionicons
              name={saved ? 'heart' : 'heart-outline'}
              size={18}
              color={saved ? Colors.rose : '#ffffff'}
            />
          </TouchableOpacity>
        </View>

        {/* Rating Pill bottom right of image */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#b45309" style={{ marginRight: 3 }} />
          <Text style={styles.ratingScore}>{hall.rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({hall.reviewCount})</Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.content}>
        {/* Title & Locality */}
        <Text style={styles.title} numberOfLines={1}>
          {hall.name}
        </Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={13} color={Colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {hall.area}, {hall.city}
          </Text>
        </View>

        {/* Feature Badges Row */}
        <View style={styles.badgesRow}>
          {hall.vegOnly ? (
            <Badge label="Pure Veg" icon="leaf" type="veg" />
          ) : null}
          {hall.isAC ? (
            <Badge label="AC Banquet" icon="snow" type="muted" />
          ) : null}
          {hall.hasParking ? (
            <Badge label="Valet Parking" icon="car" type="muted" />
          ) : null}
          {hall.hasRooms ? (
            <Badge label="Rooms Available" icon="bed" type="muted" />
          ) : null}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom Pricing & Capacity Grid */}
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.priceLabel}>Hall Rental</Text>
            <Text style={styles.priceValue}>{formatPrice(hall.pricePerDay)}<Text style={styles.priceUnit}> / day</Text></Text>
          </View>

          <View style={styles.footerDivider} />

          <View>
            <Text style={styles.priceLabel}>Catering from</Text>
            <Text style={styles.priceValue}>₹{hall.pricePerPlate}<Text style={styles.priceUnit}> / plate</Text></Text>
          </View>

          <View style={styles.footerDivider} />

          <View>
            <Text style={styles.priceLabel}>Guest Capacity</Text>
            <Text style={styles.capacityValue}>
              {hall.capacityMin}-{hall.capacityMax}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    height: 190,
    width: '100%',
    position: 'relative',
    backgroundColor: Colors.surfaceSecondary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlayTop: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  featuredText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1c1917',
    letterSpacing: 0.5,
  },
  heartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartButtonSaved: {
    backgroundColor: '#ffffff',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingScore: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
    marginRight: 3,
  },
  ratingCount: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 10,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.divider,
  },
  priceLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  priceUnit: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  capacityValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});

