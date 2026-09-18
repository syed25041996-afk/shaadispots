import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageStyle,
  ViewStyle,
  StyleProp,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

interface SafeImageProps {
  source: { uri: string } | number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  photoCount?: number;
}

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80';

export const SafeImage: React.FC<SafeImageProps> = ({
  source,
  style,
  containerStyle,
  resizeMode = 'cover',
  photoCount,
}) => {
  const initialUri = typeof source === 'object' && source?.uri ? source.uri : DEFAULT_FALLBACK;
  const [currentUri, setCurrentUri] = useState<string>(initialUri);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError && currentUri !== DEFAULT_FALLBACK) {
      setHasError(true);
      setCurrentUri(DEFAULT_FALLBACK);
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Loading Placeholder */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={Colors.goldDark} />
        </View>
      )}

      {/* Main Image */}
      <Image
        source={{ uri: currentUri }}
        style={[styles.image, style]}
        resizeMode={resizeMode}
        onLoad={() => setLoading(false)}
        onError={handleError}
      />

      {/* Photo Count Badge */}
      {photoCount && photoCount > 1 ? (
        <View style={styles.photoCountBadge}>
          <Ionicons name="camera" size={11} color={Colors.goldLight} />
          <Text style={styles.photoCountText}>{photoCount} Photos</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceSecondary,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  photoCountBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(28, 25, 23, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 2,
  },
  photoCountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
});
