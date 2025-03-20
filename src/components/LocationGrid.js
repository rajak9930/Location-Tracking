import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const LocationGrid = ({locations, onClearData}) => {
  const {theme, isDarkMode, toggleTheme} = useTheme();

  const formatTimestamp = timestamp => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={[styles.header, {backgroundColor: theme.header}]}>
        <Text style={[styles.title, {color: theme.text}]}>
          Location History
        </Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.themeButton, {backgroundColor: theme.button}]}>
            <Text style={[styles.themeButtonText, {color: theme.buttonText}]}>
              {isDarkMode ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClearData}
            style={[styles.clearButton, {backgroundColor: theme.button}]}>
            <Text style={[styles.clearButtonText, {color: theme.buttonText}]}>
              Clear Data
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.tableHeader, {backgroundColor: theme.gridHeader}]}>
        <Text style={[styles.headerCell, styles.latCell, {color: theme.text}]}>
          Latitude
        </Text>
        <Text style={[styles.headerCell, styles.lonCell, {color: theme.text}]}>
          Longitude
        </Text>
        <Text style={[styles.headerCell, styles.timeCell, {color: theme.text}]}>
          Time
        </Text>
      </View>

      <ScrollView style={styles.tableBody}>
        {locations.map((location, index) => (
          <View
            key={index}
            style={[
              styles.row,
              {
                backgroundColor: theme.gridRow,
                borderBottomColor: theme.gridBorder,
              },
            ]}>
            <Text style={[styles.cell, styles.latCell, {color: theme.text}]}>
              {location.latitude.toFixed(6)}
            </Text>
            <Text style={[styles.cell, styles.lonCell, {color: theme.text}]}>
              {location.longitude.toFixed(6)}
            </Text>
            <Text style={[styles.cell, styles.timeCell, {color: theme.text}]}>
              {formatTimestamp(location.timestamp)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 8,
    borderRadius: 4,
  },
  themeButton: {
    padding: 8,
    borderRadius: 4,
  },
  clearButtonText: {
    fontWeight: 'bold',
  },
  themeButtonText: {
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 12,
  },
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
  },
  tableBody: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
  },
  latCell: {
    flex: 1.2,
  },
  lonCell: {
    flex: 1.2,
  },
  timeCell: {
    flex: 1.5,
  },
});

export default LocationGrid;
