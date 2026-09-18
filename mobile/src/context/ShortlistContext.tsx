import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ShortlistContextType {
  shortlist: string[];
  isShortlisted: (id: string) => boolean;
  toggleShortlist: (id: string) => Promise<void>;
  clearShortlist: () => Promise<void>;
}

const STORAGE_KEY = '@shaadispots_shortlist';

const ShortlistContext = createContext<ShortlistContextType>({
  shortlist: [],
  isShortlisted: () => false,
  toggleShortlist: async () => {},
  clearShortlist: async () => {},
});

export const ShortlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shortlist, setShortlist] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setShortlist(JSON.parse(raw));
        }
      } catch (err) {
        console.warn('Failed to load shortlist:', err);
      }
    })();
  }, []);

  const isShortlisted = (id: string) => shortlist.includes(id);

  const toggleShortlist = async (id: string) => {
    try {
      let updated: string[];
      if (shortlist.includes(id)) {
        updated = shortlist.filter((item) => item !== id);
      } else {
        updated = [...shortlist, id];
      }
      setShortlist(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to update shortlist:', err);
    }
  };

  const clearShortlist = async () => {
    try {
      setShortlist([]);
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to clear shortlist:', err);
    }
  };

  return (
    <ShortlistContext.Provider
      value={{ shortlist, isShortlisted, toggleShortlist, clearShortlist }}
    >
      {children}
    </ShortlistContext.Provider>
  );
};

export const useShortlist = () => useContext(ShortlistContext);

