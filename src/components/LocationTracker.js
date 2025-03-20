import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Platform,
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const LOCATION_STORAGE_KEY = '@location_history';
const LOCATION_UPDATE_INTERVAL = 30000; // 30 sec

const LocationTracker = ({onLocationUpdate}) => {
  const {theme} = useTheme();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const saveLocation = async location => {
    try {
      const timestamp = new Date().toISOString();
      const locationData = {
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp,
      };

      const existingData = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
      const locations = existingData ? JSON.parse(existingData) : [];

      locations.push(locationData);

      await AsyncStorage.setItem(
        LOCATION_STORAGE_KEY,
        JSON.stringify(locations),
      );

      setCurrentLocation(locationData);
      setLastUpdate(new Date());

      if (onLocationUpdate) {
        onLocationUpdate(locationData);
      }
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  useEffect(() => {
    let watchId = null;
    let intervalId = null;

    const startLocationTracking = async () => {
      await requestLocationPermission();

      const locationOptions = {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: LOCATION_UPDATE_INTERVAL,
        fastestInterval: LOCATION_UPDATE_INTERVAL,
        showLocationDialog: true,
        forceRequestLocation: true,
      };

      Geolocation.getCurrentPosition(
        position => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString(),
          };
          saveLocation(location);
        },
        error => console.error('Error getting initial location:', error),
        locationOptions,
      );

      watchId = Geolocation.watchPosition(
        position => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString(),
          };
          saveLocation(location);
        },
        error => console.error('Error watching location:', error),
        locationOptions,
      );

      intervalId = setInterval(() => {
        Geolocation.getCurrentPosition(
          position => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: new Date().toISOString(),
            };
            saveLocation(location);
          },
          error => console.error('Error getting location in interval:', error),
          locationOptions,
        );
      }, LOCATION_UPDATE_INTERVAL);
    };

    startLocationTracking();

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Never';
    const now = new Date();
    const diff = now - lastUpdate;
    const seconds = Math.floor(diff / 1000);
    return `${seconds} seconds ago`;
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.header}]}>
      <Text style={[styles.updateText, {color: theme.text}]}>
        Last update: {formatLastUpdate()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center',
  },
  updateText: {
    fontSize: 12,
    opacity: 0.8,
  },
});

export default LocationTracker;
