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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
  },
  closeBtn: {
    marginTop: 15,
    textAlign: 'center',
    color: '#c62828',
    fontSize: 18,
  },
});
