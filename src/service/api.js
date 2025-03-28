import axios from 'axios';

const API_URL = 'http://10.0.2.2:5001'; // ใช้สำหรับ Android Emulator
// หากรันในอุปกรณ์จริงให้ใช้ IP Address แทน 10.0.2.2

export const registerUser = async (fullname, email, phone, password) => {
    try {
        console.log("Sending Data to API:", { fullname, email, phone, password });

        const response = await axios.post(`${API_URL}/register`, { fullname, email, phone, password });
        
        // หากการลงทะเบียนสำเร็จ จะได้ข้อมูลตอบกลับ
        console.log("Register successful:", response.data);
        return response.data;
    } 
    catch (error) {
        // การตรวจสอบข้อผิดพลาดจากเซิร์ฟเวอร์
        console.error("Register failed:", error.response?.data || error.message);

        // หากไม่มี response จากเซิร์ฟเวอร์ เช่นกรณีที่เครือข่ายล้มเหลว
        if (!error.response) {
            throw new Error("Network error. Please check your connection.");
        }

        // หากเซิร์ฟเวอร์ตอบกลับมาด้วยข้อผิดพลาด ให้แสดงข้อความจากเซิร์ฟเวอร์
        throw new Error(error.response?.data?.message || "Error registering user");
    }
};

export const loginUser = async (identifier, password) => {
    try {
        console.log("Sending Data to API:", { identifier, password });

        const response = await axios.post(`${API_URL}/login`, { phone: identifier, password });

        console.log("API Response:", response.data);

        return response.data;
    } 
    catch (error) {
        console.error("API Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error logging in");
    }
};
