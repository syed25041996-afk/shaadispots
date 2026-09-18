import React, { useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet, Text } from 'react-native';
import { Colors } from '../../theme/colors';
import { SafeImage } from '../common/SafeImage';

interface HallGalleryPagerProps {
  images: string[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HallGalleryPager: React.FC<HallGalleryPagerProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (slide !== activeIndex && slide >= 0 && slide < images.length) {
      setActiveIndex(slide);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(_: string, index: number) => `img-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }: { item: string }) => (
          <SafeImage
            source={{ uri: item }}
            style={styles.image}
            containerStyle={styles.imageContainer}
            resizeMode="cover"
          />
        )}
      />

      {/* Counter Pill Top Right */}
      <View style={styles.counterBadge}>
        <Text style={styles.counterText}>
          {activeIndex + 1} / {images.length}
        </Text>
      </View>

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {images.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              activeIndex === idx && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    width: '100%',
    position: 'relative',
    backgroundColor: '#000000',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: 280,
  },
  image: {
    width: SCREEN_WIDTH,
    height: 280,
  },
  counterBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    marginHorizontal: 3.5,
  },
  activeDot: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
  },
});
