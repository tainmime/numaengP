const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to SQLite DB");
    }
});

const runQuery = promisify(db.run.bind(db));
const getQuery = promisify(db.get.bind(db));

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    password TEXT
)`);

app.post("/login", async (req, res) => {
    const { phone, password } = req.body;

    try {
        if (!phone || !password) {
            return res.status(400).send({ message: "Phone and password are required" });
        }

        const user = await getQuery(`SELECT * FROM users WHERE phone = ?`, [phone]);

        if (!user) return res.status(400).send({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ message: "Invalid password" });

        const token = jwt.sign({ id: user.id, phone: user.phone }, "SECRET_KEY", { expiresIn: "1h" });

        res.send({ 
            message: "Login successful", 
            token, 
            fullname: user.fullname, 
            email: user.email, 
            avatarUrl: user.avatarUrl || "https://via.placeholder.com/100"
        });

    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.post("/register", async (req, res) => {
    try {
        console.log("POST request received:", req.body);  // แสดงข้อมูลที่ได้รับจาก Client

        const { fullname, email, phone, password } = req.body;
        if (!fullname || !password || (!email && !phone)) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // การเข้ารหัสรหัสผ่าน
        const encryptedPassword = await bcrypt.hash(password, 10);

        // การเพิ่มข้อมูลไปยังฐานข้อมูล
        await runQuery(
            `INSERT INTO users (fullname, email, phone, password) VALUES (?, ?, ?, ?)`,
            [fullname, email, phone, encryptedPassword]
        );

        res.send({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error in /register:", error);  // แสดงข้อผิดพลาดที่เกิดขึ้นในฝั่งเซิร์ฟเวอร์
        res.status(400).send({ message: "User already exists or invalid data" });
    }
});

app.listen(5001, () => console.log("Server running on port 5001"));
