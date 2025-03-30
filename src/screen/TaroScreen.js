import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet, 
  Dimensions,
  ScrollView,
  SafeAreaView
} from "react-native";

const TarotScreen = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [showCard, setShowCard] = useState(false);

  // ใช้ require สำหรับรูปไพ่ด้านหลัง
  const cardBackImage = require('../../assets/card_back.png');

  // รับขนาดหน้าจอ
  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.8;
  const cardHeight = cardWidth * 1.6;

  useEffect(() => {
    setIsReversed(Math.random() > 0.5);
  }, [card]);

  const fetchTarotCard = async () => {
    setLoading(true);
    setShowCard(false);
    
    try {
      const response = await fetch("https://tarotapi.dev/api/v1/cards/random?n=1");
      const data = await response.json();
      
      if (data.cards && data.cards.length > 0) {
        const cardData = data.cards[0];

        setCard({
          name: cardData.name,
          meaning_up: cardData.meaning_up,
          meaning_rev: cardData.meaning_rev,
          image: `https://www.sacred-texts.com/tarot/pkt/img/${cardData.name_short}.jpg`,
        });

        setTimeout(() => {
          setShowCard(true);
        }, 300);
      }
    } catch (error) {
      console.error("Error fetching tarot card:", error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Tarot ดูดวงรายวัน</Text>

          {/* พื้นที่แสดงไพ่ */}
          <View style={styles.cardArea}>
            {loading ? (
              <ActivityIndicator size="large" color="#FF3333" />
            ) : showCard && card ? (
              <View style={styles.cardContent}>
                <View style={styles.cardImageContainer}>
                  <Image 
                    source={{ uri: card.image }} 
                    style={[
                      styles.cardImage,
                      { width: cardWidth, height: cardHeight },
                      isReversed && styles.reversedCard
                    ]}
                    onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
                  />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardName}>{card.name || "ไม่พบชื่อไพ่"}</Text>
                  <ScrollView 
                    style={styles.meaningScroll}
                    showsVerticalScrollIndicator={true}
                  >
                    <Text style={styles.cardMeaning}>
                      {isReversed ? card.meaning_rev : card.meaning_up || "ไม่มีคำทำนาย"}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            ) : (
              <View style={styles.cardContent}>
                <View style={styles.cardImageContainer}>
                  <Image 
                    source={cardBackImage} 
                    style={[styles.cardImage, { width: cardWidth, height: cardHeight }]}
                  />
                </View>
              </View>
            )}
          </View>

          {/* ปุ่ม Random */}
          <TouchableOpacity 
            style={styles.randomButton} 
            onPress={fetchTarotCard}
            disabled={loading}
          >
            <Text style={styles.randomButtonText}>
              {loading ? 'กำลังสุ่ม...' : 'สุ่มไพ่'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFAF0' // เปลี่ยนสีพื้นหลังเป็น Ivory
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
    backgroundColor: '#FFFAF0' // เปลี่ยนสีพื้นหลัง ScrollView เป็น Ivory
  },
  container: { 
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
    paddingBottom: 20,
    minHeight: '100%',
    backgroundColor: '#FFFAF0' // เปลี่ยนสีพื้นหลัง Container เป็น Ivory
  },
  title: { 
    fontSize: 28,
    fontWeight: "bold",
    color: '#FF3333',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center'
  },
  cardArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFFAF0' // เปลี่ยนสีพื้นหลัง Card Area เป็น Ivory
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: '100%'
  },
  cardImageContainer: {
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20
  },
  cardImage: { 
    resizeMode: "contain",
    borderRadius: 15,
    width: '100%',
    height: '100%'
  },
  reversedCard: {
    transform: [{ rotate: '180deg' }],
  },
  cardTextContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    padding: 15
  },
  cardName: { 
    fontSize: 24,
    fontWeight: "bold",
    color: '#FF3333',
    textAlign: 'center',
    marginBottom: 15,
  },
  meaningScroll: {
    maxHeight: 150,
  },
  cardMeaning: { 
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
    color: '#555',
    paddingHorizontal: 5
  },
  randomButton: {
    backgroundColor: '#FF3333',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    minWidth: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  randomButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default TarotScreen;