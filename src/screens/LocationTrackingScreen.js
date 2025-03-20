import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationTracker from '../components/LocationTracker';
import LocationGrid from '../components/LocationGrid';
import LocationMap from '../components/MapView';

const LOCATION_STORAGE_KEY = '@location_history';

const LocationTrackingScreen = () => {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
      if (storedLocations) {
        setLocations(JSON.parse(storedLocations));
      }
    } catch (error) {
      console.error('Error loading locations:', error);
    }
  };

  const handleLocationUpdate = (location) => {
    setCurrentLocation(location);
    loadLocations(); 
  };

  const handleClearData = async () => {
    try {
      await AsyncStorage.removeItem(LOCATION_STORAGE_KEY);
      setLocations([]);
      Alert.alert('Success', 'Location history cleared successfully');
    } catch (error) {
      console.error('Error clearing locations:', error);
      Alert.alert('Error', 'Failed to clear location history');
    }
  };

  return (
    <View style={styles.container}>
      <LocationTracker onLocationUpdate={handleLocationUpdate} />
      <LocationMap location={currentLocation} />
      <LocationGrid
        locations={locations}
        onClearData={handleClearData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default LocationTrackingScreen;