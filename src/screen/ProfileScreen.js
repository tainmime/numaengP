import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Animated, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";




const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);
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

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const user = await AsyncStorage.getItem("user");
                const avatarUrl = await AsyncStorage.getItem("avatarUrl");
                if (user) {
                    setUserData(JSON.parse(user));
                } else {
                    setUserData({
                        fullname: "NamAeng",
                        email: "NamAeng@example.com",
                    });
                }
                if (avatarUrl) {
                    setImage(avatarUrl);
                }
            } catch (error) {
                console.error("Error loading user data:", error);
                Alert.alert("Error", "Failed to load user data");
            }
        };

        loadUserData();
    }, []);

    const handleImagePick = async () => {
        launchImageLibrary(
            {
                mediaType: "photo",
                includeBase64: false,
                quality: 1,
                selectionLimit: 1,
            },
            async (response) => {
                if (response.didCancel) {
                    console.log("User cancelled image picker");
                } else if (response.errorCode) {
                    console.log("ImagePicker Error: ", response.errorMessage);
                } else {
                    const source = { uri: response.assets[0].uri };
                    setImage(source.uri);
                    console.log("Picked image:", source.uri);

                    await AsyncStorage.setItem("avatarUrl", source.uri);

                    const refreshedUser = await AsyncStorage.getItem("user");
                    if (refreshedUser) {
                        setUserData(JSON.parse(refreshedUser));
                    }
                }
            }
        );
    };

    const handleSignOut = async () => {
        await AsyncStorage.removeItem("user");
        navigation.replace("Home");
    };

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={isDarkMode ? require('../../assets/DarkmodeH.png') : require('../../assets/LightmodeH.png')}
            style={styles.container}
        >
            <View style={styles.profileContain}>
                <Image
                    source={{ uri: image || userData.avatarUrl || "https://via.placeholder.com/100" }}
                    style={styles.avatar}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{userData.fullname}</Text>
                    <Text style={styles.email}>{userData.email}</Text>
                    <TouchableOpacity style={[styles.button,{ backgroundColor: isDarkMode ? "#444" : "white" }]} onPress={handleImagePick}>
                        <Text style={[styles.buttonText ,{ color: isDarkMode ? "#fff" : "#000" }]}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.innerContainer,{ backgroundColor: isDarkMode ? "#444" : "white" }]}>
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.switchContainer} onPress={toggleDarkMode}>
                <Animated.View
                    style={[
                        styles.switchBall,
                        { transform: [{ translateX: switchTranslateX }] }
                    ]}
                />
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    innerContainer: {
        width: "100%",
        height: 720,
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 20,
        alignItems: "center",
        marginTop: 10,
    },
    profileContain: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 170,
    },
    textContainer: {
        marginLeft: 20,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: "#fff",
        alignItems: 'flex-start',
        marginLeft: 60,
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 5,
        color: '#fff',
    },
    email: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width:100,
    },
    buttonText: {
        color: "#D10000",
        fontSize: 16,
        fontWeight: 'bold',
    },
    switchContainer: {
        position: "absolute",
        top: 50,
        right: 30,
        width: 45,
        height: 20,
        borderRadius: 15,
        backgroundColor: "#ddd",
        justifyContent: "center",
        paddingHorizontal: 2,
        marginRight: 15,
    },
    switchBall: {
        width: 16,
        height: 16,
        borderRadius: 13,
        backgroundColor: "#fff",
        position: "absolute",
        top: 2,
    },
    signOutButton: {
        backgroundColor: "#D10000",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    signOutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
