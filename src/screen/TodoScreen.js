import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import Category from "../component/Category";

const STORAGE_KEY = "@cards_data";

const TodoScreen = () => {
  const [users, setUsers] = useState([]); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    const saveCards = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };
    if (users.length > 0) { // ตรวจสอบว่า users มีข้อมูลก่อนที่จะบันทึก
      saveCards();
    }
  }, [users]);

  const loadCards = async () => {
    try {
      const storedCards = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedCards) {
        const parsedCards = JSON.parse(storedCards);
        if (Array.isArray(parsedCards)) {
          setUsers(parsedCards); // ตรวจสอบว่า parsedCards เป็น array ก่อน
        }
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const clearCard = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUsers([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addMsg = () => {
    if (!title.trim() || !content.trim() || !category.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const newMsg = {
      id: Date.now().toString(),
      name: title.trim(),
      content : content.trim(),
      category: category.trim(),
    };

    setUsers((prevUsers) => [newMsg, ...prevUsers]);
    setTitle("");
    setContent("");
    setCategory("");
    setModalVisible(false);
  };

  // ✅ จัดกลุ่มข้อมูลตาม `category`
  const groupedData = users.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {/* Header + ไอคอนเพิ่ม */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Do-List</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="pluscircle" size={32} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Modal สำหรับเพิ่ม Do-List */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Do-List</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter Title"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.input}
              value={content}
              onChangeText={setContent}
              placeholder="Enter Content"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholder="Enter Category"
              placeholderTextColor="gray"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.addButton} onPress={addMsg}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ✅ ใช้ Component `Category` แทนการเขียน FlatList ตรงนี้ */}
      <FlatList
        data={Object.keys(groupedData)}
        keyExtractor={(category) => category}
        renderItem={({ item: category }) => (
          <Category category={category} data={groupedData[category]} />
        )}
      />

      {/* ปุ่ม Clear */}
      <TouchableOpacity style={styles.clearButton} onPress={clearCard}>
        <Text style={styles.buttonText}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
});

export default TodoScreen;
