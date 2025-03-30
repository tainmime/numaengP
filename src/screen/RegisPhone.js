import { useState } from "react";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { registerUser } from "../service/api";

const RegisPhone = ({ navigation }) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        if (!fullname || !email || !phone || !password || !confirmPassword) {
            Alert.alert("Error", "All fields are required");
            return;
        }
    
        if (!/^\d{10}$/.test(phone)) {
            Alert.alert("Error", "Invalid phone number");
            return;
        }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            Alert.alert("Error", "Invalid email format");
            return;
        }
    
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
    
        try {
            console.log("Attempting to register with:", { fullname, email, phone, password });
    
            await registerUser(fullname, email, phone, password);
            Alert.alert("Register Success", "Registration successful");
            navigation.navigate("Login");
        } catch (error) {
            console.error("Register Failed:", error);  // เพิ่มการ log ข้อความของข้อผิดพลาด
            Alert.alert("Register Failed", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Text}>Register</Text>
            <TextInput
                style={styles.input}
                value={fullname}
                onChangeText={setFullname}
                placeholder="Fullname"
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone"
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button1}
                onPress={handleRegister}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        width: "100%",
        height: 50,
        margin: 3,
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
    },
    button: {
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 15,
        margin: 3,
        backgroundColor: '#3E3E40',
    },
    button1: {
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 15,
        margin: 3,
        backgroundColor: '#819898',
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    Text: {
        fontSize: 30,
        fontWeight: "bold",
        margin: 10,
    },
});

export default RegisPhone;
