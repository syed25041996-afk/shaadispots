import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { EnquiryPayload } from '../types/hall';
import { hallService } from '../services/hallService';
import { Colors } from '../theme/colors';
import { Header } from '../components/common/Header';
import { EmptyState } from '../components/common/EmptyState';

export const EnquiriesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [enquiries, setEnquiries] = useState<EnquiryPayload[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    const data = await hallService.getEnquiries();
    setEnquiries(data);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchEnquiries();
    }, [fetchEnquiries])
  );

  const handleCallConcierge = () => {
    Linking.openURL('tel:+919876543210').catch((err: any) =>
      console.warn('Concierge dial error:', err)
    );
  };

  const handleWhatsAppConcierge = (item: EnquiryPayload) => {
    const text = encodeURIComponent(
      `Hi ShaadiSpots Concierge! I have submitted an enquiry for ${item.hallName || 'a wedding hall'} on ${item.eventDate} for ${item.guestCount} guests (Ref: ${item.id || 'N/A'}). Could you help expedite availability?`
    );
    Linking.openURL(`https://wa.me/919876543210?text=${text}`).catch((err: any) =>
      console.warn('WhatsApp error:', err)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header
        title="My Enquiries"
        subtitle={
          enquiries.length === 1
            ? '1 active wedding booking request'
            : `${enquiries.length} active booking requests`
        }
      />

      {/* Concierge Guarantee Info Banner */}
      <View style={styles.guaranteeBanner}>
        <Ionicons name="shield-checkmark" size={20} color={Colors.gold} />
        <View style={styles.guaranteeTextWrap}>
          <Text style={styles.guaranteeTitle}>ShaadiSpots 24-Hour Promise</Text>
          <Text style={styles.guaranteeSub}>
            Venue managers contact you directly with real-time slot availability & custom menus.
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Retrieving your wedding enquiries...</Text>
        </View>
      ) : enquiries.length === 0 ? (
        <View style={styles.emptyWrap}>
          <EmptyState
            icon="calendar-outline"
            title="No Active Booking Requests"
            description="When you check availability or request a site visit at any hall, your confirmation and manager contacts will appear here."
            buttonTitle="Discover Wedding Halls"
            onButtonPress={() => navigation.navigate('Listings')}
          />
        </View>
      ) : (
        <FlatList
          data={enquiries}
          keyExtractor={(item: EnquiryPayload, index: number) => item.id || `enq-${index}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onRefresh={fetchEnquiries}
          refreshing={loading}
          renderItem={({ item }: { item: EnquiryPayload }) => (
            <View style={styles.card}>
              {/* Header Row */}
              <View style={styles.cardHeader}>
                <View style={styles.titleWrap}>
                  <Text style={styles.hallName} numberOfLines={1}>
                    {item.hallName || 'Luxury Wedding Venue'}
                  </Text>
                  <Text style={styles.enquiryRef}>Ref: #{item.id || 'PENDING'}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>{item.status || 'Confirmed'}</Text>
                </View>
              </View>

              {/* Booking Specs Grid */}
              <View style={styles.specsGrid}>
                <View style={styles.specItem}>
                  <Ionicons name="calendar" size={15} color={Colors.primary} />
                  <View>
                    <Text style={styles.specLabel}>Event Date</Text>
                    <Text style={styles.specValue}>{item.eventDate}</Text>
                  </View>
                </View>

                <View style={styles.specItem}>
                  <Ionicons name="people" size={15} color={Colors.primary} />
                  <View>
                    <Text style={styles.specLabel}>Expected Guests</Text>
                    <Text style={styles.specValue}>{item.guestCount} Guests</Text>
                  </View>
                </View>

                <View style={styles.specItem}>
                  <Ionicons name="person" size={15} color={Colors.primary} />
                  <View>
                    <Text style={styles.specLabel}>Lead Contact</Text>
                    <Text style={styles.specValue}>{item.name}</Text>
                  </View>
                </View>

                <View style={styles.specItem}>
                  <Ionicons name="call" size={15} color={Colors.primary} />
                  <View>
                    <Text style={styles.specLabel}>Phone Number</Text>
                    <Text style={styles.specValue}>{item.phone}</Text>
                  </View>
                </View>
              </View>

              {/* Custom Message note if entered */}
              {item.message ? (
                <View style={styles.messageBubble}>
                  <Ionicons name="chatbubble-ellipses-outline" size={14} color={Colors.textSecondary} />
                  <Text style={styles.messageText} numberOfLines={3}>
                    "{item.message}"
                  </Text>
                </View>
              ) : null}

              {/* Timestamp */}
              {item.createdAt && (
                <Text style={styles.timestamp}>Submitted on {item.createdAt}</Text>
              )}

              {/* Action Buttons */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionBtnOutline}
                  onPress={() =>
                    navigation.navigate('HallDetail', { hallId: item.hallId })
                  }
                  activeOpacity={0.8}
                >
                  <Ionicons name="eye-outline" size={15} color={Colors.primary} />
                  <Text style={styles.actionBtnOutlineText}>View Venue</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionBtnSolid}
                  onPress={() => handleWhatsAppConcierge(item)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="logo-whatsapp" size={15} color="#ffffff" />
                  <Text style={styles.actionBtnSolidText}>Concierge Help</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  guaranteeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 2,
    borderBottomColor: Colors.gold,
  },
  guaranteeTextWrap: {
    flex: 1,
  },
  guaranteeTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  guaranteeSub: {
    color: '#fed7aa',
    fontSize: 11,
    lineHeight: 15,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
    backgroundColor: Colors.background,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 8,
  },
  titleWrap: {
    flex: 1,
  },
  hallName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  enquiryRef: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.emeraldLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.emerald,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.emerald,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    backgroundColor: Colors.surfaceSecondary,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  specItem: {
    width: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  specLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  specValue: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginTop: 1,
  },
  messageBubble: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#fffbeb',
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: Colors.gold,
    marginBottom: 10,
  },
  messageText: {
    flex: 1,
    fontSize: 12,
    color: '#78350f',
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 11,
    color: Colors.textLight,
    marginBottom: 14,
    textAlign: 'right',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtnOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 38,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  actionBtnOutlineText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  actionBtnSolid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#15803d',
  },
  actionBtnSolidText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
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
  emptyWrap: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
