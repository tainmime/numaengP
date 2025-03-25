import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Modal } from 'react-native';
import DayCard from '../component/DayCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const screenWidth = Dimensions.get('window').width;

  const getDaysInMonth = (year, month) => {
    const numDays = new Date(year, month + 1, 0).getDate();
    return [...Array(numDays)].map((_, i) => i + 1);
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay(); // หาวันแรกของเดือน
  };

  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const changeMonth = (n) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + n, 1));
  };

  const openModal = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  // เตรียม data สำหรับ flatlist เพื่อแสดงวันในแต่ละเดือน
  const calendarDays = [...Array(firstDay).fill(null), ...days];

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Text style={styles.arrow}>◀</Text>
          </TouchableOpacity>
          <Text style={styles.month}>
            {currentDate.toLocaleString('default', { month: 'long' }).toUpperCase()} {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Text style={styles.arrow}>▶</Text>
          </TouchableOpacity>
        </View>

        {/* Day Labels */}
        <View style={styles.weekRow}>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <Text style={styles.weekDay} key={day}>{day}</Text>
          ))}
        </View>

        {/* Calendar Days */}
        <FlatList
          data={calendarDays}
          numColumns={7}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <View style={[styles.dayBox, { width: (screenWidth - 70) / 7 }]}>
                {item && <Text style={styles.dayText}>{item}</Text>}
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />

        {/* Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 50,
    alignItems: 'center', // จัดให้ปฏิทินอยู่กลางจอ
    justifyContent: 'center', // จัดให้ปฏิทินอยู่กลางจอ
  },
  calendarContainer: { // เพิ่ม Container ที่ล้อมรอบปฏิทิน
    padding: 10,  // เพิ่ม padding รอบๆ ปฏิทิน
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: '#fff',
    width: '90%',  // กำหนดให้ขนาดปฏิทินอยู่ที่ 90% ของความกว้างหน้าจอ
  },
  header: {
    backgroundColor: '#c62828',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  month: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  arrow: { fontSize: 28, color: '#fff' },
  weekRow: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ccc' },
  weekDay: { flex: 1, textAlign: 'center', paddingVertical: 8, fontWeight: 'bold', color: '#c62828' },

  dayBox: {
    height: 70,  // ความสูงของวัน
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dayText: { 
    fontSize: 14, 
    color: '#333', 
    fontWeight: 'bold' 
  },  // ลดขนาดตัวเลข
  swipeText: { textAlign: 'center', color: '#c62828', marginTop: 15 },
  closeBtn: {
    marginTop: 15,
    textAlign: 'center',
    color: '#c62828',
    fontSize: 18,
  },
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
    padding: 20,
  },
});
