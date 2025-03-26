import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert ,ImageBackground, Animated} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";  // ✅ นำเข้า makeRedirectUri() ที่ถูกต้อง
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


// Firebase Authentication
import { auth } from "../service/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

// ✅ ทำให้ WebBrowser ปิดอัตโนมัติหลัง Sign-In
WebBrowser.maybeCompleteAuthSession();


const RegisterScreen = ({ navigation }) => {


    const [isDarkMode, setIsDarkMode] = useState(false);
    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('darkMode');
            if (savedTheme !== null) {
                setIsDarkMode(savedTheme === 'true');
            }
        };
        loadTheme();
    }, []);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isDarkMode ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isDarkMode]);

    const toggleDarkMode = async () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        await AsyncStorage.setItem('darkMode', newMode.toString());
    };

    const switchTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 28],
    });
    // 🔹 ใช้ makeRedirectUri() อย่างถูกต้อง
    const redirectUri = makeRedirectUri({
        useProxy: true, // ✅ Expo Managed Workflow ใช้ Proxy
        scheme: "yourapp", // หรือกำหนด custom scheme ถ้าใช้ Bare Workflow
    });

    // 🔹 ใช้ Google.useAuthRequest() ที่ถูกต้อง
    const [googleRequest, googleResponse, promptGoogleSignIn] = Google.useAuthRequest({
        webClientId: "134513512208-hke46l7bdsgs6g9bsm6at9b950n512cd.apps.googleusercontent.com",
        androidClientId: "134513512208-pn7087k4d1e1mf1729gmsl7pv1jcr9sk.apps.googleusercontent.com",
        expoClientId: "134513512208-hke46l7bdsgs6g9bsm6at9b950n512cd.apps.googleusercontent.com",
        redirectUri, // ✅ ใช้ค่าจาก makeRedirectUri()
        scopes: ["profile", "email"],
    });

    // 📌 ตรวจสอบ response จาก Google Sign-In
    useEffect(() => {
        if (googleResponse?.type === "success") {
            const { id_token } = googleResponse.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(() => Alert.alert("✅ Success", "Google Sign-In Successful"))
                .catch((error) => Alert.alert("❌ Error", error.message));
        }
    }, [googleResponse]);

    return (
        <ImageBackground 
                    source={isDarkMode ? require('../../assets/RegisterL.png') : require('../../assets/RegisterL.png')} 
                    style={styles.container}
                >
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons 
                    name="crown-outline" 
                    size={40} 
                    color="red" 
                    style={[styles.crownIcon, { top: -15 }]} 
                />
                <MaterialCommunityIcons 
                    name="dog" 
                    size={120} 
                    color="red" 
                    style={styles.logo} 
                />
            </View>

            <TouchableOpacity 
                style={[styles.button, { backgroundColor: isDarkMode ? "#444" : "#444" }]} 
                onPress={() => navigation.navigate("Register")}
            > 
                <Text style={styles.buttonText}>Phone or Email</Text>
            </TouchableOpacity>
            <Text style={styles.text}>___________________ OR ___________________</Text>
            <TouchableOpacity style={styles.googleButton} onPress={() => promptGoogleSignIn()}>
                <Text style={styles.buttonText}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton2} onPress={() => promptGoogleSignIn()}>
                <Text style={styles.buttonText}>Sign in with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
};

// **🎨 สไตล์**
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },
    googleButton: {
        backgroundColor: "#DB4437",
        padding: 12,
        borderRadius: 10,
        width: 300,
        alignItems: "center",
        marginBottom: 10,
        borderRadius: 15,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    googleButton2: {
        backgroundColor: "#1877F2",
        padding: 12,
        borderRadius: 10,
        width: 300,
        alignItems: "center",
        marginBottom: 10,
        borderRadius: 15,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    backButton: {
        backgroundColor: "#666",
        padding: 12,
        borderRadius: 10,
        width: 300,
        alignItems: "center",
        marginTop: 20,
        borderRadius: 15,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        
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
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", 
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        elevation: 5,
        marginTop: 25,
        marginBottom: 10,
        width: 300,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    text: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

export default RegisterScreen;
