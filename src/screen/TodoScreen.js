import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, ImageBackground, FlatList } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign"; 
import Category from "../component/Category";

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5001/todos");
      const todos = await response.json();
      setTodos(todos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addMsg = async () => {
    if (!title || !content || !category || !date) return;

    const newMsg = {
      title,
      content,
      category,
      date,
    };

    try {
      await fetch("http://10.0.2.2:5001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMsg),
      });
      fetchTodos();
      setTitle("");
      setContent("");
      setCategory("");
      setDate("");
      setIsModalVisible(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`http://10.0.2.2:5001/todos/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  const groupedData = Array.isArray(todos)
  ? todos.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {})
  : {};


  const toggleFavorite = (id) => {
    setFavoriteItems((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const renderFavoriteIcon = (id) => {
    if (!favoriteItems.includes(id)) {
      return null;  
    }
    return (
      <View style={styles.favoriteIcon}>
        <AntDesign
          name="heart"
          size={24}
          color="red" 
        />
      </View>
    );
  };

  return (
    <ImageBackground 
      source={require('../../assets/ToDo.png')} 
      style={styles.container}
    >
      <Text style={styles.header}>To-Do List</Text>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
            <TextInput style={styles.input} value={content} onChangeText={setContent} placeholder="Content" />
            <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Category" />
            <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="Date (วว/ดด/ปปปป)" />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.submitButton} onPress={addMsg}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {Object.keys(groupedData).map((category) => (
        <Category
          key={category}
          category={category}
          data={groupedData[category]}
          deleteItem={deleteItem}
          favoriteItems={favoriteItems}
          toggleFavorite={toggleFavorite}
          renderFavoriteIcon={renderFavoriteIcon}
        />
      ))}

      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonText}>New List</Text>
        <AntDesign name="pluscircle" size={30} color="red" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 10,
    padding: 20,
    color: "white",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 50,
    elevation: 10,
    marginBottom: 30,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 8,
    color: "red",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  submitButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  favoriteIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});

export default TodoScreen;
