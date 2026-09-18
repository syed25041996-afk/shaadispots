import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { ListingsScreen } from '../screens/ListingsScreen';
import { ShortlistScreen } from '../screens/ShortlistScreen';
import { EnquiriesScreen } from '../screens/EnquiriesScreen';
import { ConciergeScreen } from '../screens/ConciergeScreen';
import { useShortlist } from '../context/ShortlistContext';
import { Colors } from '../theme/colors';

export type BottomTabParamList = {
  Home: undefined;
  Listings: { initialSearch?: string; initialArea?: string; featuredOnly?: boolean } | undefined;
  Shortlist: undefined;
  Enquiries: undefined;
  Concierge: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const TabNavigator: React.FC = () => {
  const { shortlist } = useShortlist();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons
              name={focused ? 'sparkles' : 'sparkles-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Listings"
        component={ListingsScreen}
        options={{
          tabBarLabel: 'Venues',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons
              name={focused ? 'business' : 'business-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Shortlist"
        component={ShortlistScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarBadge: shortlist.length > 0 ? shortlist.length : undefined,
          tabBarBadgeStyle: styles.badgeStyle,
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={22}
              color={focused ? Colors.rose : color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Enquiries"
        component={EnquiriesScreen}
        options={{
          tabBarLabel: 'Enquiries',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons
              name={focused ? 'receipt' : 'receipt-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Concierge"
        component={ConciergeScreen}
        options={{
          tabBarLabel: 'Concierge',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <Ionicons
              name={focused ? 'headset' : 'headset-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: Platform.OS === 'ios' ? 86 : 64,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  badgeStyle: {
    backgroundColor: Colors.primary,
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
});

