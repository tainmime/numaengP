import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DayCard({ date }) {
  return (
    <View style={styles.card}>
      <Text style={styles.dateText}>Details for {date}</Text>
      <Text style={styles.todoText}>To-Do list will be displayed here in the future.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  dateText: { fontSize: 22, fontWeight: 'bold', color: '#c62828', marginBottom: 15 },
  todoText: { fontSize: 18, color: '#333', marginVertical: 4 }
});
