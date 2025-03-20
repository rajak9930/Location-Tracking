import BackgroundGeolocation from 'react-native-background-geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const configureBackgroundTracking = async (onLocationUpdate) => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
  } else {
    const status = await Geolocation.requestAuthorization('always');
    if (status !== 'granted') return;
  }

  await BackgroundGeolocation.ready({
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 0,
    stopOnTerminate: false,
    startOnBoot: true,
    foregroundService: true,
    heartbeatInterval: 30,
    notification: {
      title: 'Location Tracking',
      text: 'Active',
      channelName: 'Location Tracking',
      smallIcon: 'ic_notification',
    },
    debug: false,
    logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
  });


  BackgroundGeolocation.onLocation((location) => {
    onLocationUpdate({
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: location.timestamp
    });
  });


  BackgroundGeolocation.onMotionChange((event) => {
    console.log('Motion state changed:', event.isMoving);
  });


  BackgroundGeolocation.start();

  return () => {
    BackgroundGeolocation.stop();
    BackgroundGeolocation.removeListeners();
  };
};