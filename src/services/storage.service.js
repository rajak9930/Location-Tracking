import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_KEY = '@locations';
const MAX_ENTRIES = 1000;

export const saveLocation = async (location) => {
  try {
    const stored = await AsyncStorage.getItem(LOCATION_KEY);
    const locations = stored ? JSON.parse(stored) : [];
    
  
    const updated = [location, ...locations].slice(0, MAX_ENTRIES);
    
    await AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Storage error:', error);
    return [];
  }
};

export const loadLocations = async () => {
  try {
    const stored = await AsyncStorage.getItem(LOCATION_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Load error:', error);
    return [];
  }
};

export const clearLocations = async () => {
  try {
    await AsyncStorage.removeItem(LOCATION_KEY);
    return [];
  } catch (error) {
    console.error('Clear error:', error);
    return [];
  }
};