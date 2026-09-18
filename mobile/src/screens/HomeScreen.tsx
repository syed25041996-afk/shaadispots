import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Hall } from '../types/hall';
import { hallService } from '../services/hallService';
import { Colors } from '../theme/colors';
import { Header } from '../components/common/Header';
import { HeroBanner } from '../components/home/HeroBanner';
import { QuickAreaChips } from '../components/home/QuickAreaChips';
import { StatsStrip } from '../components/home/StatsStrip';
import { HallCard } from '../components/halls/HallCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Areas');

  useEffect(() => {
    (async () => {
      const data = await hallService.getAllHalls();
      setHalls(data);
    })();
  }, []);

  const featuredHalls = halls.filter((h) => h.featured);

  const handleSearchSubmit = () => {
    navigation.navigate('Listings', {
      initialSearch: searchQuery,
      initialArea: selectedArea !== 'All Areas' ? selectedArea : undefined,
    });
  };

  const handleSelectArea = (area: string) => {
    setSelectedArea(area);
    navigation.navigate('Listings', {
      initialArea: area !== 'All Areas' ? area : undefined,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Royal Hero Banner & Search */}
        <HeroBanner
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSubmitSearch={handleSearchSubmit}
        />

        {/* 2. Quick Area Chips */}
        <QuickAreaChips
          selectedArea={selectedArea}
          onSelectArea={handleSelectArea}
        />

        {/* 3. Verified Stats Strip */}
        <StatsStrip />

        {/* 4. Featured Royal Venues Carousel */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Featured Royal Venues</Text>
            <Text style={styles.sectionSub}>Curated luxury wedding landmarks</Text>
          </View>
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => navigation.navigate('Listings', { featuredOnly: true })}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={featuredHalls.slice(0, 5)}
          keyExtractor={(item: Hall) => `feat-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
          renderItem={({ item }: { item: Hall }) => (
            <View style={styles.carouselCardWrap}>
              <HallCard
                hall={item}
                onPress={() => navigation.navigate('HallDetail', { hallId: item.id })}
              />
            </View>
          )}
        />

        {/* 5. Recently Listed Venues List */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Top Kalyana Mantapas</Text>
            <Text style={styles.sectionSub}>Spacious halls for traditional ceremonies</Text>
          </View>
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => navigation.navigate('Listings')}
          >
            <Text style={styles.viewAllText}>Explore</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.verticalList}>
          {halls.slice(4, 9).map((item) => (
            <HallCard
              key={`home-list-${item.id}`}
              hall={item}
              onPress={() => navigation.navigate('HallDetail', { hallId: item.id })}
            />
          ))}
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
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  sectionSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  carouselContent: {
    paddingHorizontal: 16,
    gap: 14,
    paddingBottom: 6,
  },
  carouselCardWrap: {
    width: SCREEN_WIDTH * 0.82,
  },
  verticalList: {
    paddingHorizontal: 16,
  },
});
