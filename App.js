import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import LocationTrackingScreen from './src/screens/LocationTrackingScreen';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        <StatusBar barStyle="light-content" />
        <LocationTrackingScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;