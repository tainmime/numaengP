import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

const EditTodo = ({ listData, deleteItem, toggleFavorite }) => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const initialFavorites = listData.reduce((acc, item) => {
      acc[item.id] = item.isFavorite || false;
      return acc;
    }, {});
    setFavorites(initialFavorites);
  }, [listData]);

  const handleFavoriteToggle = (id) => {
    const newFavoriteStatus = !favorites[id];
    setFavorites({ ...favorites, [id]: newFavoriteStatus });
    toggleFavorite(id, newFavoriteStatus);
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemContent}>{item.content}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
       
            {favorites[item.id] && (
              <MaterialIcons name="favorite" size={24} color="red" style={styles.favoriteIcon} />
            )}
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.hiddenContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(item.id)}
            >
              <Feather name="delete" size={24} color="red" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {}}
            >
              <Feather name="edit" size={24} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => handleFavoriteToggle(item.id)} 
            >
              <MaterialIcons
                name={favorites[item.id] ? "favorite" : "favorite-border"}
                size={24}
                color="red"
              />
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={-360} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
  listItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemContent: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  itemCategory: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
  hiddenContainer: {
    flexDirection: "row", 
    justifyContent: "flex-end", 
    alignItems: "center", 
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "",
    width: 70,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "white",
    width: 70,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  editText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  favoriteButton: {
    backgroundColor: "white", 
    width: 70,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default EditTodo;
