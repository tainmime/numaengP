import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, ImageBackground } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "../component/Category";

const STORAGE_KEY = "@cards_data";

const HomeScreen = () => {
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]); 

  const loadCards = async () => {
    try {
      const storedCards = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedCards) {
        setUser(JSON.parse(storedCards));
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const addMsg = async () => {
    if (!title || !content || !category) return;

    const newMsg = {
      id: Date.now().toString(),
      title,
      content,
      category,
    };

    const updatedCards = [newMsg, ...user];
    setUser(updatedCards);
    setTitle("");
    setContent("");
    setCategory("");
    setIsModalVisible(false);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteItem = async (id) => {
    const updatedCards = user.filter((item) => item.id !== id);
    setUser(updatedCards);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const groupedData = user.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

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
          renderFavoriteIcon={renderFavoriteIcon} // ส่งฟังก์ชันนี้ไปที่ Category
        />
      ))}

      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonText}>New List</Text>
        <AntDesign name="pluscircle" size={30} color="red" />
      </TouchableOpacity>
    </ImageBackground>
  );
}

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
    bottom: 20, // ปรับค่า bottom ที่นี่เพื่อเพิ่มระยะห่างจากขอบล่าง
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 50,
    elevation: 10,
    marginBottom: 30, // เพิ่มระยะห่างจากขอบล่าง 30 หน่วย
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

export default HomeScreen;
