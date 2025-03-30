<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Modal } from 'react-native';
import DayCard from '../component/DayCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('month'); // month or week

  const screenWidth = Dimensions.get('window').width;

  const getDaysInMonth = (year, month) => {
    const numDays = new Date(year, month + 1, 0).getDate();
    return [...Array(numDays)].map((_, i) => i + 1);
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const getDaysInWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // ไปยังวันเริ่มต้นของสัปดาห์ (วันอาทิตย์)

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day.getDate());
    }
    return days;
  };

  const days = activeButton === 'week' ? getDaysInWeek(currentDate) : getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const calendarDays = [...Array(firstDay).fill(null), ...days];

  const changeMonth = (n) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + n, 1));
  };

  const changeWeek = (n) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (n * 7)));
  };

  const openModal = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* ปุ่มเปลี่ยนมุมมอง */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.iconButton, activeButton === 'month' && styles.activeButton]}
            onPress={() => handleButtonPress('month')}
          >
            <MaterialIcons name="calendar-month" size={24} color={activeButton === 'month' ? '#c62828' : 'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, activeButton === 'week' && styles.activeButton]}
            onPress={() => handleButtonPress('week')}
          >
            <FontAwesome5 name="calendar-week" size={24} color={activeButton === 'week' ? '#c62828' : 'white'} />
          </TouchableOpacity>
        </View>

        {/* ปฏิทิน */}
        <View style={styles.calendarContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => activeButton === 'month' ? changeMonth(-1) : changeWeek(-1)}>
              <Text style={styles.arrow}>◀</Text>
            </TouchableOpacity>
            <Text style={styles.month}>
              {activeButton === 'month'
                ? `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`
                : `Week of ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`}
            </Text>
            <TouchableOpacity onPress={() => activeButton === 'month' ? changeMonth(1) : changeWeek(1)}>
              <Text style={styles.arrow}>▶</Text>
            </TouchableOpacity>
          </View>

          {activeButton === 'week' ? (
            <FlatList
              data={days}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openModal(item)}>
                  <View style={[styles.dayBox, { width: screenWidth - 20 }]}>
                    <Text style={styles.dayText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <FlatList
              data={calendarDays}
              numColumns={7}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openModal(item)}>
                  <View style={[styles.dayBox, { width: (screenWidth - 70) / 7 }]}>
                    {item && <Text style={styles.dayText}>{item}</Text>}
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <DayCard date={`${selectedDay}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`} />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeBtn}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
=======
import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, ImageBackground } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import Category from "../components/Category";

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
>>>>>>> b475acb57590be03e0337ded8e93c2dd6da1cd3a
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#c62828',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: '#fff',
    borderColor: '#c62828',
    borderWidth: 2,
  },
  calendarContainer: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#c62828',
  },
  month: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  arrow: { fontSize: 28, color: '#fff' },
  dayBox: {
    height: 65,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dayText: { fontSize: 14, color: '#333', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 16,
=======
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
>>>>>>> b475acb57590be03e0337ded8e93c2dd6da1cd3a
    padding: 20,
  },
<<<<<<< HEAD
  closeBtn: {
    marginTop: 15,
    textAlign: 'center',
    color: '#c62828',
    fontSize: 18,
  },
});
=======
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
>>>>>>> b475acb57590be03e0337ded8e93c2dd6da1cd3a
