import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from '../context/ThemeContext';

const LocationMap = ({ location }) => {
  const { theme } = useTheme();
  const [region, setRegion] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(0.0922);

  if (!location) return null;

  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: zoomLevel,
    longitudeDelta: zoomLevel,
  };

  const handleZoomIn = () => {
    const newZoomLevel = Math.max(0.01, zoomLevel / 2);
    setZoomLevel(newZoomLevel);
    setRegion({
      ...region,
      latitudeDelta: newZoomLevel,
      longitudeDelta: newZoomLevel,
    });
  };

  const handleZoomOut = () => {
    const newZoomLevel = Math.min(0.5, zoomLevel * 2);
    setZoomLevel(newZoomLevel);
    setRegion({
      ...region,
      latitudeDelta: newZoomLevel,
      longitudeDelta: newZoomLevel,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        region={region || initialRegion}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        customMapStyle={theme.isDarkMode ? [
          {
            "elementType": "geometry",
            "stylers": [{"color": "#242f3e"}]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#242f3e"}]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#746855"}]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"color": "#2b3544"}]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#9ca5b3"}]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#17263c"}]
          }
        ] : []}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Current Location"
          description={`Last updated: ${new Date(location.timestamp).toLocaleString()}`}
        />
      </MapView>
      <View style={styles.zoomControls}>
        <TouchableOpacity 
          style={[styles.zoomButton, { backgroundColor: theme.button }]} 
          onPress={handleZoomIn}
        >
          <Text style={[styles.zoomButtonText, { color: theme.buttonText }]}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.zoomButton, { backgroundColor: theme.button }]} 
          onPress={handleZoomOut}
        >
          <Text style={[styles.zoomButtonText, { color: theme.buttonText }]}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  zoomControls: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'transparent',
  },
  zoomButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LocationMap; 