import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const Category = ({ category, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
  data={data}
  keyExtractor={(item) => item.id.toString()} // ✅ ป้องกัน Error
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
});

export default Category;