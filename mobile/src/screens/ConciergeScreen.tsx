import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Header } from '../components/common/Header';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Is ShaadiSpots really 100% free for couples?',
    answer:
      'Yes, absolutely! Our venue advisory and site visit coordination are completely complimentary for couples and families. There are zero added commissions or surprise surcharges.',
  },
  {
    question: 'How early should we book a Kalyana Mantapa in Bengaluru?',
    answer:
      'For auspicious Muhurtham dates (particularly Nov–Feb and May–July), Bangalore heritage halls and premium convention centers typically book out 6 to 12 months in advance.',
  },
  {
    question: 'What is the difference between Hall Rent and Per Plate pricing?',
    answer:
      'Traditional kalyana mantapas and palaces charge a flat daily rental fee (including bride/groom AC suites), allowing you to bring your own caterers. Hotel banquets typically charge per plate and waive basic hall rent if minimum guest criteria are met.',
  },
  {
    question: 'Can we bring our own decorators and caterers?',
    answer:
      'Most standalone mantapas allow external decorators and caterers of your choice. Hotel banquets require in-house catering, while decor can be selected from their approved panel.',
  },
  {
    question: 'How do accompanied site visits work?',
    answer:
      'Simply call or WhatsApp our concierge team. We coordinate directly with the hall manager to ensure a private walkthrough of the main mandap, dining hall, kitchen hygiene, and parking facilities.',
  },
];

export const ConciergeScreen: React.FC = () => {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleCall = () => {
    Linking.openURL('tel:+919876543210').catch((err: any) =>
      console.warn('Call error:', err)
    );
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hi ShaadiSpots Concierge! I need assistance finding and booking a wedding hall in Bengaluru.'
    );
    Linking.openURL(`https://wa.me/919876543210?text=${text}`).catch((err: any) =>
      console.warn('WhatsApp error:', err)
    );
  };

  const handleEmail = () => {
    Linking.openURL('mailto:concierge@shaadispots.com?subject=Wedding Venue Advisory Request').catch(
      (err: any) => console.warn('Email error:', err)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header title="Royal Concierge" subtitle="Free Expert Venue Matchmaking" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Ionicons name="sparkles" size={13} color={Colors.gold} />
            <Text style={styles.heroBadgeText}>VIP WEDDING ASSISTANCE</Text>
          </View>
          <Text style={styles.heroTitle}>Your Personal Bengaluru Wedding Venue Specialist</Text>
          <Text style={styles.heroDesc}>
            Confused between multiple kalyana mantapas? Our dedicated venue concierges will cross-verify
            open Muhurtham dates, negotiate exclusive banquet rates, and arrange private manager walkthroughs.
          </Text>

          {/* Quick Contact Buttons */}
          <View style={styles.contactRow}>
            <TouchableOpacity
              style={[styles.contactButton, styles.phoneButton]}
              onPress={handleCall}
              activeOpacity={0.8}
            >
              <Ionicons name="call" size={16} color="#ffffff" />
              <Text style={styles.contactButtonText}>Direct Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contactButton, styles.whatsAppButton]}
              onPress={handleWhatsApp}
              activeOpacity={0.8}
            >
              <Ionicons name="logo-whatsapp" size={16} color="#ffffff" />
              <Text style={styles.contactButtonText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contactButton, styles.emailButton]}
              onPress={handleEmail}
              activeOpacity={0.8}
            >
              <Ionicons name="mail" size={16} color="#ffffff" />
              <Text style={styles.contactButtonText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Value Pillars */}
        <Text style={styles.sectionHeading}>Why Families Trust ShaadiSpots</Text>

        <View style={styles.pillarsGrid}>
          <View style={styles.pillarCard}>
            <View style={styles.pillarIconWrap}>
              <Ionicons name="gift-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.pillarTitle}>100% Free Service</Text>
            <Text style={styles.pillarDesc}>Zero advisory fees, zero booking markups.</Text>
          </View>

          <View style={styles.pillarCard}>
            <View style={styles.pillarIconWrap}>
              <Ionicons name="pricetag-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.pillarTitle}>Best Price Promise</Text>
            <Text style={styles.pillarDesc}>Direct venue owner rates with verified inclusions.</Text>
          </View>

          <View style={styles.pillarCard}>
            <View style={styles.pillarIconWrap}>
              <Ionicons name="shield-checkmark-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.pillarTitle}>Inspected Venues</Text>
            <Text style={styles.pillarDesc}>Audited dining capacity, parking, and backup generators.</Text>
          </View>

          <View style={styles.pillarCard}>
            <View style={styles.pillarIconWrap}>
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.pillarTitle}>Fast Response</Text>
            <Text style={styles.pillarDesc}>Real-time calendar verification within 24 hours.</Text>
          </View>
        </View>

        {/* FAQs Accordion */}
        <Text style={styles.sectionHeading}>Frequently Asked Questions</Text>
        <View style={styles.faqList}>
          {FAQS.map((faq, index) => {
            const isExpanded = expandedFaqIndex === index;
            return (
              <TouchableOpacity
                key={`faq-${index}`}
                style={[styles.faqCard, isExpanded && styles.faqCardExpanded]}
                onPress={() => toggleFaq(index)}
                activeOpacity={0.8}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={Colors.primary}
                  />
                </View>
                {isExpanded && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Partner with us CTA */}
        <View style={styles.partnerCard}>
          <Ionicons name="business" size={26} color={Colors.gold} />
          <Text style={styles.partnerTitle}>Are You a Bengaluru Venue Owner?</Text>
          <Text style={styles.partnerDesc}>
            Join ShaadiSpots to showcase your marriage hall or convention center to over 15,000+ verified families.
          </Text>
          <TouchableOpacity
            style={styles.partnerBtn}
            onPress={handleEmail}
            activeOpacity={0.8}
          >
            <Text style={styles.partnerBtnText}>List Your Venue</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.primaryDark} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.card,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 24,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    gap: 6,
    marginBottom: 12,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.goldLight,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 25,
    marginBottom: 10,
  },
  heroDesc: {
    fontSize: 13,
    color: '#fed7aa',
    lineHeight: 19,
    marginBottom: 18,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  phoneButton: {
    backgroundColor: Colors.primary,
  },
  whatsAppButton: {
    backgroundColor: '#15803d',
  },
  emailButton: {
    backgroundColor: '#334155',
  },
  contactButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
    marginTop: 6,
  },
  pillarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  pillarCard: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillarIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  pillarTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  pillarDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
  },
  faqList: {
    gap: 10,
    marginBottom: 24,
  },
  faqCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  faqCardExpanded: {
    borderColor: Colors.gold,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  faqAnswer: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  partnerCard: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borderGold,
    alignItems: 'center',
    textAlign: 'center',
  },
  partnerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 8,
    marginBottom: 6,
    textAlign: 'center',
  },
  partnerDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: 14,
  },
  partnerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  partnerBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
});
