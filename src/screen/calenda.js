import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [events, setEvents] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ฟังก์ชันในการดึงข้อมูลจาก API ปฏิทิน (ตัวอย่าง API)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // ปรับ URL ตาม API ของคุณ
        const response = await fetch('https://your-calendar-api.com/events');
        const data = await response.json();
        setEvents(data); // บันทึกข้อมูลที่ดึงมา
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // การจัดการวันที่ที่มีเหตุการณ์
  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = {
      selected: true,
      marked: true,
      selectedColor: 'blue',
      selectedTextColor: 'white'
    };
    return acc;
  }, {});

  // ฟังก์ชันเปลี่ยนธีมสี
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // ปรับเปลี่ยนสีให้เหมาะสมกับ Dark Mode และ Light Mode
  const backgroundColor = isDarkMode ? '#333' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#d32f2f';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Calendar</Text>

      {/* FlatList สำหรับการเลื่อนปฏิทิน */}
      <FlatList
        data={['January', 'February', 'March', 'April', 'May', 'June']}
        renderItem={({ item }) => (
          <View style={styles.monthContainer}>
            <Text style={[styles.monthText, { color: textColor }]}>{item}</Text>
          </View>
        )}
        keyExtractor={(item) => item}
      />

      {/* ปฏิทิน */}
      <Calendar
        current={'2025-03-25'}
        markedDates={markedDates}
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
        monthFormat={'yyyy MM'}
        hideDayNames={false}
        showWeekNumbers={true}
      />

      {/* ปุ่ม Dark Mode หรือ Light Mode */}
      <TouchableOpacity
        style={[styles.darkModeButton, { backgroundColor: textColor }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.darkModeText, { color: backgroundColor }]}>
          {isDarkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  monthContainer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    width: '100%',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkModeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkModeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
