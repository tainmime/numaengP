import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert ,ImageBackground, Animated} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


const RegisterScreen = ({ navigation }) => {


    const [isDarkMode, setIsDarkMode] = useState(false);
    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '860933797973-28ccojvp27qb6lfhnuk1kbief1ou8scr.apps.googleusercontent.com',
          });
    }
    , []);
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
    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const signInResult = await GoogleSignin.signIn();
      
        // Try the new style of google-sign in result, from v13+ of that module
        idToken = signInResult.data?.idToken;
        if (!idToken) {
          // if you are using older versions of google-signin, try old style result
          idToken = signInResult.idToken;
        }
        if (!idToken) {
          throw new Error('No ID token found');
        }
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }


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
                onPress={() => navigation.navigate("RegisPhone")}
            > 
                <Text style={styles.buttonText}>Phone or Email</Text>
            </TouchableOpacity>
            <Text style={styles.text}>___________________ OR ___________________</Text>
            <TouchableOpacity style={styles.googleButton} onPress={onGoogleButtonPress}>
                <Text style={styles.buttonText}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton2} >
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
