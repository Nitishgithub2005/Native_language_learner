const express = require("express");
const session = require("express-session");
const path = require("path");
const collection = require("./config"); // Mongoose model
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const wordsRouter = require('./routes/words');
require("dotenv").config()
const app = express();
console.log("MongoDB URI:", "enter ur url here");
// MongoDB Connection
mongoose.connect("menter ur url here bro", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware configuration
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use('/api', wordsRouter);

// Session middleware configuration
app.use(session({
    secret: 'enter here secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

// Routes to serve HTML files
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/views/login.html"));
  });
  
  app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/views/signup.html"));
  });
  
  app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/views/index.html"));
  });
  




// Register User
app.post("/signup", async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        preferredLanguage: req.body.preferredLanguage,
        languagesKnown: req.body.languagesKnown, 
        password: req.body.password,
        currentStreak: 0,
        highestStreak: 0
    };

    try {
        const existingUser = await collection.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).send("User already exists. Please choose a different email.");
        }

        const saltRounds = 10;
        data.password = await bcrypt.hash(data.password, saltRounds);

        const newUser = new collection(data);
        await newUser.save();

        console.log("User successfully created:", newUser);
        res.redirect("/");
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).send("Internal server error.");
    }
});

// Login User
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email: email });
        if (!user) {
            return res.status(400).send("Email not found.");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send("Wrong password.");
        }

        // Store user info in session
        req.session.user = {
            userId: user._id,
            username: user.username,
            email: user.email
        };

        res.redirect("/index");
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send("Internal server error.");
    }
});

// Profile Route (Protected)
app.get("/api/profile", async (req, res) => {
    // Check if user is logged in
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized. Please login." });
    }

    try {
        const user = await collection.findById(req.session.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const profileData = {
            username: user.username,
            email: user.email,
            preferredLanguage: user.preferredLanguage,
            languagesKnown: user.languagesKnown, // Include languages known
            currentStreak: user.currentStreak || 0,
            highestStreak: user.highestStreak || 0,
        };

        res.json(profileData);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Logout User
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to logout." });
        }
        res.redirect("/");
    });
});

// Define the port for the application
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
