import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';

const LocationList = ({ locations }) => {
  const reversedLocations = [...locations].reverse();

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.latitude?.toFixed(6) || 'N/A'}</Text>
      <Text style={styles.cell}>{item.longitude?.toFixed(6) || 'N/A'}</Text>
      <Text style={styles.cell}>
        {item.timestamp ? moment(item.timestamp).format('HH:mm:ss') : 'N/A'}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={reversedLocations}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.timestamp}_${index}`}
      ListHeaderComponent={() => (
        <View style={[styles.row, styles.header]}>
          <Text style={styles.headerCell}>Latitude</Text>
          <Text style={styles.headerCell}>Longitude</Text>
          <Text style={styles.headerCell}>Time</Text>
        </View>
      )}
      contentContainerStyle={styles.listContent}
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222',
    fontSize: 15,
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  listContent: {
    flexGrow: 1,
  },
});

export default LocationList;