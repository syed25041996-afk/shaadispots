import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface ToastOptions {
  type?: 'success' | 'info' | 'error';
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'info' | 'error'>('success');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const showToast = useCallback(
    (msg: string, options?: ToastOptions) => {
      setMessage(msg);
      setToastType(options?.type || 'success');
      setVisible(true);

      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.delay(options?.duration || 2600),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
      });
    },
    [fadeAnim]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <Animated.View
          style={[
            styles.toastContainer,
            toastType === 'success' && styles.successToast,
            toastType === 'error' && styles.errorToast,
            toastType === 'info' && styles.infoToast,
            { opacity: fadeAnim },
          ]}
        >
          <Ionicons
            name={
              toastType === 'success'
                ? 'checkmark-circle'
                : toastType === 'error'
                ? 'alert-circle'
                : 'information-circle'
            }
            size={20}
            color="#ffffff"
            style={styles.icon}
          />
          <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 55,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  successToast: {
    backgroundColor: Colors.primaryDark,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  errorToast: {
    backgroundColor: '#991b1b',
  },
  infoToast: {
    backgroundColor: '#1e293b',
  },
  icon: {
    marginRight: 10,
  },
  toastText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});

