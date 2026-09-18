import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'gold' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : '#ffffff'}
        />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={size === 'small' ? 16 : size === 'large' ? 20 : 18}
              color={
                variant === 'outline' || variant === 'ghost'
                  ? Colors.primary
                  : variant === 'gold'
                  ? '#1c1917'
                  : '#ffffff'
              }
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.text,
              styles[`${variant}Text`],
              styles[`${size}Text`],
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  primaryText: {
    color: '#ffffff',
  },
  gold: {
    backgroundColor: Colors.gold,
  },
  goldText: {
    color: '#1c1917',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  outlineText: {
    color: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: Colors.primary,
  },
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  smallText: {
    fontSize: 12,
  },
  medium: {
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  mediumText: {
    fontSize: 15,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  largeText: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

