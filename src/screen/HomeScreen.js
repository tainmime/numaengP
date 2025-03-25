import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <ImageBackground 
            // อย่าลืมเปลี่ยน Path ให้ตรงกับที่เราเก็บรูปไว้เด้อ
            source={isDarkMode ? require('/Users/j/Desktop/MoblieApp/numaengP/assets/Black_and_White_With_Yellow_Smoke_Coming_Soon_Instagram_Story_Video.png') : require('/Users/j/Desktop/MoblieApp/numaengP/assets/Black_and_White_With_Yellow_Smoke_Coming_Soon_Instagram_Story_Video-2.png')} 
            style={styles.container}
        >
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons 
                    name="crown-outline" 
                    size={40} 
                    color={isDarkMode ? "black" : "#d32f2f"} 
                    style={[styles.crownIcon, { top: -15 }]} 
                />
                <MaterialCommunityIcons 
                    name="dog" 
                    size={120} 
                    color={isDarkMode ? "black" : "#d32f2f"} 
                    style={styles.logo} 
                />
            </View>

            <Text style={[styles.title, { color: isDarkMode ? "black" : "#e63946" }]}>
                NamAeng
            </Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? "#bbb" : "#6c757d" }]}>
                Welcome to our App
            </Text>
            
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: isDarkMode ? "#444" : "#d32f2f" }]} 
                onPress={() => navigation.navigate("Login")}
            > 
                <MaterialCommunityIcons name="login" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: isDarkMode ? "#444" : "#d32f2f" }]} 
                onPress={() => navigation.navigate("Register")}
            > 
                <MaterialCommunityIcons name="account" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.darkModeButton, { backgroundColor: isDarkMode ? "#EFCFD4" : "#444" }]}
                onPress={() => setIsDarkMode(!isDarkMode)}
            >
                <Text style={[styles.darkModeText, { color: isDarkMode ? "#333" : "#fff" }]}>
                    {isDarkMode ? "☀️" : "🌙"}
                </Text>
            </TouchableOpacity>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    iconContainer: {
        alignItems: "center",
        position: "relative",
    },
    crownIcon: {
        position: "absolute",
        top: -10,
        zIndex: 1,
    },
    logo: {
        marginBottom: 15,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: "center",
        fontStyle: "italic",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", 
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 5,
        marginTop: 15,
        width: 200,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
    },
    darkModeButton: {
        position: "absolute",
        top: 50,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    darkModeText: {
        fontSize: 24,
    },
});

export default HomeScreen;