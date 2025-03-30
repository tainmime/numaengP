// DayCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DayCard({ date, todos }) {
  const filteredTodos = todos?.filter((item) => item.date === date);

  return (
    <View style={styles.card}>
      <Text style={styles.dateText}>To-Dos for {date}</Text>
      {filteredTodos && filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <View key={todo.id} style={{ marginBottom: 10 }}>
            <Text style={styles.todoTitle}>{todo.title}</Text>
            <Text>{todo.content}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.todoText}>ไม่มีข้อมูล To-Do สำหรับวันนี้</Text>
      )}
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
  todoText: { fontSize: 18, color: '#333', marginVertical: 4 },
  todoTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' }
});
