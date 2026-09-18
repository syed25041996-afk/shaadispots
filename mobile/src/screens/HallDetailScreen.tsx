import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Hall } from '../types/hall';
import { hallService } from '../services/hallService';
import { Colors } from '../theme/colors';
import { Header } from '../components/common/Header';
import { HallGalleryPager } from '../components/halls/HallGalleryPager';
import { HallSpecsGrid } from '../components/halls/HallSpecsGrid';
import { EnquiryModal } from '../components/halls/EnquiryModal';
import { useShortlist } from '../context/ShortlistContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';

export const HallDetailScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { hallId } = route.params;
  const [hall, setHall] = useState<Hall | null>(null);
  const [loading, setLoading] = useState(true);
  const [enquiryModalVisible, setEnquiryModalVisible] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const { isShortlisted, toggleShortlist } = useShortlist();
  const { showToast } = useToast();
  const saved = hall ? isShortlisted(hall.id) : false;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await hallService.getHallById(hallId);
      setHall(data);
      setLoading(false);
    })();
  }, [hallId]);

  if (loading || !hall) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading venue specifications...</Text>
      </SafeAreaView>
    );
  }

  const handleToggleShortlist = () => {
    toggleShortlist(hall.id);
    showToast(
      saved ? `Removed ${hall.name} from shortlist` : `Saved ${hall.name} to your shortlist!`,
      { type: saved ? 'info' : 'success' }
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${hall.name} in ${hall.area}, Bangalore on ShaadiSpots! Capacity: ${hall.capacityMin}-${hall.capacityMax} guests.`,
        title: hall.name,
      });
    } catch (err: any) {
      console.warn('Share error:', err);
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${hall.contactPhone}`).catch((err: any) =>
      console.warn('Dial error:', err)
    );
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi, I am interested in booking ${hall.name} for an upcoming wedding. Could you share available dates and packages?`
    );
    Linking.openURL(`https://wa.me/919845011223?text=${text}`).catch((err: any) =>
      console.warn('WhatsApp error:', err)
    );
  };

  const handleMap = () => {
    Linking.openURL(hall.mapLink).catch((err: any) =>
      console.warn('Map open error:', err)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Header */}
      <Header
        showBack={true}
        onBack={() => navigation.goBack()}
        title={hall.name}
        subtitle={`${hall.area}, ${hall.city}`}
        rightAction={
          <View style={styles.headerRightActions}>
            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <Ionicons name="share-social-outline" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headerIconBtn, saved && styles.headerIconBtnSaved]}
              onPress={handleToggleShortlist}
              activeOpacity={0.7}
            >
              <Ionicons
                name={saved ? 'heart' : 'heart-outline'}
                size={20}
                color={saved ? Colors.rose : Colors.primary}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Full-Width Image Gallery Carousel */}
        <HallGalleryPager images={hall.images} />

        {/* 2. Venue Title, Rating & Locality */}
        <View style={styles.titleSection}>
          <View style={styles.ratingRow}>
            <View style={styles.ratingPill}>
              <Ionicons name="star" size={13} color="#b45309" />
              <Text style={styles.ratingText}>{hall.rating.toFixed(2)}</Text>
              <Text style={styles.reviewsCount}>({hall.reviewCount} reviews)</Text>
            </View>

            {hall.featured && (
              <View style={styles.featuredPill}>
                <Ionicons name="sparkles" size={11} color="#1c1917" />
                <Text style={styles.featuredText}>ROYAL PALACE</Text>
              </View>
            )}
          </View>

          <Text style={styles.venueName}>{hall.name}</Text>

          <TouchableOpacity style={styles.addressRow} onPress={handleMap} activeOpacity={0.7}>
            <Ionicons name="location" size={15} color={Colors.primary} />
            <Text style={styles.addressText} numberOfLines={2}>
              {hall.address}, {hall.area}, {hall.city}
            </Text>
            <Text style={styles.viewMapText}>View Map</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Direct Contact Action Bar (Call, WhatsApp, Directions) */}
        <View style={styles.quickContactBar}>
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={handleCall}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={18} color={Colors.primary} />
            <Text style={styles.contactBtnText}>Call Venue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.contactBtn, styles.whatsappBtn]}
            onPress={handleWhatsApp}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#059669" />
            <Text style={[styles.contactBtnText, { color: '#059669' }]}>
              WhatsApp
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactBtn}
            onPress={handleMap}
            activeOpacity={0.8}
          >
            <Ionicons name="navigate" size={18} color="#0284c7" />
            <Text style={[styles.contactBtnText, { color: '#0284c7' }]}>
              Directions
            </Text>
          </TouchableOpacity>
        </View>

        {/* 4. Specifications & Pricing Grid */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Venue Specifications</Text>
          <HallSpecsGrid hall={hall} />
        </View>

        {/* 5. About the Venue */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>About this Venue</Text>
          <Text
            style={styles.descriptionText}
            numberOfLines={showFullDesc ? undefined : 3}
          >
            {hall.description}
          </Text>
          {hall.description.length > 150 && (
            <TouchableOpacity
              onPress={() => setShowFullDesc((prev) => !prev)}
              style={styles.readMoreBtn}
            >
              <Text style={styles.readMoreText}>
                {showFullDesc ? 'Show Less' : 'Read Full Description'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 6. Verified Amenities Checklist */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Included Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {hall.amenities.map((amenity, idx) => (
              <View key={idx} style={styles.amenityItem}>
                <Ionicons name="checkmark-circle" size={17} color={Colors.emerald} />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 7. Verified Reviews Section */}
        {hall.reviews && hall.reviews.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.reviewHeaderRow}>
              <Text style={styles.sectionHeading}>Couples & Guest Reviews</Text>
              <View style={styles.overallRatingBadge}>
                <Ionicons name="star" size={12} color="#b45309" />
                <Text style={styles.overallRatingScore}>{hall.rating}</Text>
              </View>
            </View>

            {hall.reviews.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.reviewTopRow}>
                  <View>
                    <Text style={styles.reviewAuthor}>{rev.author}</Text>
                    {rev.eventType && (
                      <Text style={styles.reviewEventType}>{rev.eventType}</Text>
                    )}
                  </View>
                  <View style={styles.reviewDateStars}>
                    <Text style={styles.reviewDate}>{rev.date}</Text>
                    <View style={styles.starsRow}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons
                          key={i}
                          name={i < rev.rating ? 'star' : 'star-outline'}
                          size={11}
                          color="#f59e0b"
                        />
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{rev.comment}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* 8. Sticky Bottom Booking Bar */}
      <View style={styles.stickyBottomBar}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPriceLabel}>Rental from</Text>
          <Text style={styles.bottomPriceValue}>
            {hall.pricePerDay >= 100000
              ? `₹${(hall.pricePerDay / 100000).toFixed(1)} Lakh`
              : `₹${hall.pricePerDay.toLocaleString('en-IN')}`}
            <Text style={styles.bottomPriceUnit}> / day</Text>
          </Text>
        </View>

        <Button
          title="Check Dates & Book"
          onPress={() => setEnquiryModalVisible(true)}
          variant="primary"
          size="medium"
          icon="calendar"
          style={{ flex: 1, marginLeft: 16 }}
        />
      </View>

      {/* Enquiry Modal */}
      <EnquiryModal
        visible={enquiryModalVisible}
        hall={hall}
        onClose={() => setEnquiryModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.card,
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconBtnSaved: {
    backgroundColor: '#ffe4e6',
  },
  titleSection: {
    padding: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#b45309',
  },
  reviewsCount: {
    fontSize: 11,
    color: '#78716c',
  },
  featuredPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    gap: 4,
  },
  featuredText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1c1917',
    letterSpacing: 0.5,
  },
  venueName: {
    fontFamily: 'serif',
    fontSize: 21,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 28,
    marginBottom: 6,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addressText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  viewMapText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  quickContactBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: 10,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  whatsappBtn: {
    backgroundColor: '#ecfdf5',
    borderColor: '#a7f3d0',
  },
  contactBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: Colors.card,
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  sectionHeading: {
    fontFamily: 'serif',
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#44403c',
    lineHeight: 22,
  },
  readMoreBtn: {
    marginTop: 6,
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  amenitiesGrid: {
    gap: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  amenityText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  overallRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  overallRatingScore: {
    fontSize: 12,
    fontWeight: '800',
    color: '#b45309',
  },
  reviewCard: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  reviewEventType: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  reviewDateStars: {
    alignItems: 'flex-end',
  },
  reviewDate: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 3,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  reviewComment: {
    fontSize: 13,
    color: '#44403c',
    lineHeight: 19,
  },
  stickyBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  bottomPriceCol: {
    justifyContent: 'center',
  },
  bottomPriceLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  bottomPriceValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  bottomPriceUnit: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
