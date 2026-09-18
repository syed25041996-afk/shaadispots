import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HallFilters } from '../../types/hall';
import { POPULAR_AREAS } from '../../data/halls';
import { Colors } from '../../theme/colors';
import { Button } from '../common/Button';

interface HallFiltersModalProps {
  visible: boolean;
  filters: HallFilters;
  onApply: (filters: HallFilters) => void;
  onClose: () => void;
}

export const HallFiltersModal: React.FC<HallFiltersModalProps> = ({
  visible,
  filters,
  onApply,
  onClose,
}) => {
  const [localFilters, setLocalFilters] = useState<HallFilters>(filters);

  const PRICE_PRESETS = [
    { label: 'Any Budget', value: undefined },
    { label: 'Under ₹4 Lakh', value: 400000 },
    { label: 'Under ₹6 Lakh', value: 600000 },
    { label: 'Under ₹8 Lakh', value: 800000 },
  ];

  const CAPACITY_PRESETS = [
    { label: 'Any Guests', value: undefined },
    { label: '250+ Guests', value: 250 },
    { label: '500+ Guests', value: 500 },
    { label: '1,000+ Guests', value: 1000 },
    { label: '2,000+ Guests', value: 2000 },
  ];

  const handleReset = () => {
    const empty: HallFilters = {
      search: localFilters.search,
      area: 'All Areas',
      maxPricePerDay: undefined,
      minCapacity: undefined,
      vegOnly: false,
      isAC: false,
      hasParking: false,
      hasRooms: false,
      sortBy: localFilters.sortBy,
    };
    setLocalFilters(empty);
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filter Venues</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* 1. Locality / Area */}
            <Text style={styles.sectionTitle}>Locality in Bengaluru</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipScroll}
            >
              {POPULAR_AREAS.map((area) => {
                const isSelected =
                  (localFilters.area || 'All Areas') === area;
                return (
                  <TouchableOpacity
                    key={area}
                    style={[
                      styles.chip,
                      isSelected && styles.chipSelected,
                    ]}
                    onPress={() =>
                      setLocalFilters({
                        ...localFilters,
                        area: area === 'All Areas' ? undefined : area,
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextSelected,
                      ]}
                    >
                      {area}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* 2. Maximum Budget Per Day */}
            <Text style={styles.sectionTitle}>Max Hall Rental / Day</Text>
            <View style={styles.presetGrid}>
              {PRICE_PRESETS.map((preset, idx) => {
                const isSelected =
                  localFilters.maxPricePerDay === preset.value;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.presetCard,
                      isSelected && styles.presetCardSelected,
                    ]}
                    onPress={() =>
                      setLocalFilters({
                        ...localFilters,
                        maxPricePerDay: preset.value,
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.presetText,
                        isSelected && styles.presetTextSelected,
                      ]}
                    >
                      {preset.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* 3. Minimum Guest Capacity */}
            <Text style={styles.sectionTitle}>Minimum Guest Capacity</Text>
            <View style={styles.presetGrid}>
              {CAPACITY_PRESETS.map((preset, idx) => {
                const isSelected =
                  localFilters.minCapacity === preset.value;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.presetCard,
                      isSelected && styles.presetCardSelected,
                    ]}
                    onPress={() =>
                      setLocalFilters({
                        ...localFilters,
                        minCapacity: preset.value,
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.presetText,
                        isSelected && styles.presetTextSelected,
                      ]}
                    >
                      {preset.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* 4. Toggles */}
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.toggleLabel}>100% Pure Vegetarian</Text>
                <Text style={styles.toggleSub}>Strictly veg venues only</Text>
              </View>
              <Switch
                value={localFilters.vegOnly || false}
                onValueChange={(val) =>
                  setLocalFilters({ ...localFilters, vegOnly: val })
                }
                trackColor={{ false: '#e2e8f0', true: Colors.primary }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.toggleLabel}>Central Air Conditioning</Text>
                <Text style={styles.toggleSub}>Fully AC ceremony halls</Text>
              </View>
              <Switch
                value={localFilters.isAC || false}
                onValueChange={(val) =>
                  setLocalFilters({ ...localFilters, isAC: val })
                }
                trackColor={{ false: '#e2e8f0', true: Colors.primary }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.toggleLabel}>Valet Parking</Text>
                <Text style={styles.toggleSub}>Parking facility on-site</Text>
              </View>
              <Switch
                value={localFilters.hasParking || false}
                onValueChange={(val) =>
                  setLocalFilters({ ...localFilters, hasParking: val })
                }
                trackColor={{ false: '#e2e8f0', true: Colors.primary }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.toggleLabel}>Guest Rooms / Suites</Text>
                <Text style={styles.toggleSub}>Overnight stay available</Text>
              </View>
              <Switch
                value={localFilters.hasRooms || false}
                onValueChange={(val) =>
                  setLocalFilters({ ...localFilters, hasRooms: val })
                }
                trackColor={{ false: '#e2e8f0', true: Colors.primary }}
                thumbColor="#ffffff"
              />
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>

            <Button
              title="Apply Filters"
              onPress={handleApply}
              variant="primary"
              size="medium"
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '85%',
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
  closeBtn: {
    padding: 4,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 10,
  },
  chipScroll: {
    marginBottom: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  presetCard: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  presetCardSelected: {
    backgroundColor: '#ffe4e6',
    borderColor: Colors.primary,
  },
  presetText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  presetTextSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  toggleSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  resetBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});

