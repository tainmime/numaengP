import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

const Category = ({ category, data, deleteItem, toggleFavorite, favoriteItems }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <SwipeListView
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.hiddenContainer}>
            <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item.id)}>
              <MaterialIcons name="favorite" size={24} color={favoriteItems.includes(item.id) ? "red" : "white"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
              <Feather name="trash-2" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={-160}
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
    fontSize: 22,
    fontWeight: "bold",
  },
  content: {
    fontSize: 20,
    color: "gray",
  },
  hiddenContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  
    height: "100%",
    paddingHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    width: 80,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "blue",
    width: 80,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    backgroundColor: "green",
    width: 80,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Category;
