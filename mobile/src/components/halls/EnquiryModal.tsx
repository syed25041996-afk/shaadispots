import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Hall } from '../../types/hall';
import { Colors } from '../../theme/colors';
import { Button } from '../common/Button';
import { hallService } from '../../services/hallService';
import { useToast } from '../../context/ToastContext';

interface EnquiryModalProps {
  visible: boolean;
  hall: Hall;
  onClose: () => void;
  onSuccess?: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  visible,
  hall,
  onClose,
  onSuccess,
}) => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('15 November 2026');
  const [guestCount, setGuestCount] = useState(hall.capacityMin.toString());
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      showToast('Please enter your full name', { type: 'error' });
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', { type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      await hallService.createEnquiry({
        hallId: hall.id,
        hallName: hall.name,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || 'guest@shaadispots.com',
        eventDate: eventDate,
        guestCount: parseInt(guestCount, 10) || hall.capacityMin,
        message: message.trim(),
      });

      showToast(`Enquiry sent for ${hall.name}! Our concierge will call you within 2 hours.`, {
        type: 'success',
        duration: 4000,
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      showToast('Failed to send enquiry. Please try again.', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>Check Dates & Book</Text>
              <Text style={styles.headerSub} numberOfLines={1}>
                {hall.name}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Your Full Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Priya Sharma"
                placeholderTextColor={Colors.textLight}
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Mobile Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mobile Phone Number *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 98450 12345"
                placeholderTextColor={Colors.textLight}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* Email Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. priya@gmail.com"
                placeholderTextColor={Colors.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Event Date & Guest Count Row */}
            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Estimated Date</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. 15 Nov 2026"
                  placeholderTextColor={Colors.textLight}
                  value={eventDate}
                  onChangeText={setEventDate}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Expected Guests</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={`Min ${hall.capacityMin}`}
                  placeholderTextColor={Colors.textLight}
                  keyboardType="number-pad"
                  value={guestCount}
                  onChangeText={setGuestCount}
                />
              </View>
            </View>

            {/* Special Requests / Notes */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Catering or Decor Requests</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Specify pure veg catering requirements, rooms needed, or muhurtham timings..."
                placeholderTextColor={Colors.textLight}
                multiline={true}
                numberOfLines={3}
                value={message}
                onChangeText={setMessage}
              />
            </View>

            {/* Free Assistance Callout */}
            <View style={styles.callout}>
              <Ionicons name="shield-checkmark" size={20} color={Colors.emerald} />
              <Text style={styles.calloutText}>
                100% Free Concierge Service • Guaranteed Best Direct Banquet Pricing • No Brokerage
              </Text>
            </View>
          </ScrollView>

          {/* Footer Submit */}
          <View style={styles.footer}>
            <Button
              title="Submit Booking Enquiry"
              onPress={handleSubmit}
              variant="primary"
              size="large"
              loading={submitting}
              icon="paper-plane"
              style={{ width: '100%' }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '90%',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerSub: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  textInput: {
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  textArea: {
    height: 75,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 10,
  },
  calloutText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#065f46',
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});

