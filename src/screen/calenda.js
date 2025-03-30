import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Modal, ImageBackground } from 'react-native';
import DayCard from '../component/DayCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const CalendarScreen = () => {
  const [todos, setTodos] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('month'); // month or week

  const screenWidth = Dimensions.get('window').width;
  
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://26.231.42.50:5001/todos");
      const todosData = await response.json();
      setTodos(todosData);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };
   
  useEffect(() => {
    fetchTodos();
  }, []);

  const formatDate = (day, month, year) => {
    const dd = day.toString().padStart(2, '0');
    const mm = (month + 1).toString().padStart(2, '0');
    return `${dd}/${mm}/${year}`;
  };
  

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

  const days = activeButton === 'week' ? getDaysInWeek(currentDate).filter(day => day !== null) : getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
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
    <ImageBackground source={require('../../assets/calendaB.png')} style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.iconButton, activeButton === 'month' && styles.activeButton]}
            onPress={() => handleButtonPress('month')}
          >
            <Text><MaterialIcons name="calendar-month" size={24} color={activeButton === 'month' ? '#d10000' : 'white'} /></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, activeButton === 'week' && styles.activeButton]}
            onPress={() => handleButtonPress('week')}
          >
            <Text><FontAwesome5 name="calendar-week" size={24} color={activeButton === 'week' ? '#d10000' : 'white'} /></Text>
          </TouchableOpacity>
        </View>

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

          <FlatList
            data={calendarDays.filter(day => day !== null)}
            numColumns={activeButton === 'month' ? 7 : 1}
            keyExtractor={(item, index) => index.toString()}
            key={activeButton}
            renderItem={({ item }) => {
              const thisDate = formatDate(item, currentDate.getMonth(), currentDate.getFullYear());
              const hasTodo = todos.some(todo => todo.date === thisDate);
            
              return (
                <TouchableOpacity onPress={() => openModal(item)}>
                  <View style={[styles.dayBox, { width: (screenWidth - 100) / (activeButton === 'month' ? 7 : 1) }]}>
                  {item && (
                  <>
                    <Text style={styles.dayTextLeft}>{item}</Text>
                    {hasTodo && <View style={styles.dot} />}
                  </>
                  )}
                  </View>
                </TouchableOpacity>
              );
            }}            
          />
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <DayCard 
           date={formatDate(selectedDay, currentDate.getMonth(), currentDate.getFullYear())}
          todos={todos}
          />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeBtn}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'transparent',  // เปลี่ยนจาก 'white' เป็น 'transparent'
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
    backgroundColor: '#d10000',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: '#fff',
    borderColor: '#d10000',
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
    backgroundColor: '#d10000',
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
    flexDirection: 'row',
    position: 'relative',
  },
  dayTextLeft: { 
    fontSize: 14, 
    color: '#333', 
    fontWeight: 'bold', 
    textAlign: 'left',  
    marginLeft: 10,  
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
  closeBtn: {
    marginTop: 15,
    textAlign: 'center',
    color: '#d10000',
    fontSize: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 1,
  },  
});

export default CalendarScreen;
