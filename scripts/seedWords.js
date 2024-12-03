const mongoose = require('mongoose');
const Word = require('../models/words'); // Ensure this points to your Word model

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

// Words to seed
const wordsToSeed = [
    {
        word: "Serendipity",
        preferredLanguage: "English",
        languagesKnown: ["English"],  // User knows only English
        meanings: {
            "English": "Finding something good without looking for it",
            "Kannada": "ಒಂದು ಉತ್ತಮವನ್ನು ಹುಡುಕದೇ ಕಾಪಾಡುವುದು",
            "Hindi": "कुछ अच्छा ढूंढना बिना ढूंढे",
            "Telugu": "ఎదురుగా మంచి దేన్నో కనుగొనడం"
        },
        example: "By serendipity, I found my favorite book in a small bookstore."
    },
    { 
        word: "ನಮಸ್ಕಾರ",
        preferredLanguage: "Kannada",
        languagesKnown: ["Kannada", "English"],  // User knows Kannada and English
        meanings: {
            "English": "Greetings",
            "Kannada": "ನಮಸ್ಕಾರ",
            "Hindi": "नमस्कार",
            "Telugu": "నమస్కారం"
        },
        example: "ನಮಸ್ಕಾರ ಎಂದರು."
    },
    { 
        word: "ಹೂವು",
        preferredLanguage: "Kannada",
        languagesKnown: ["Kannada", "English"],
        meanings: {
            "English": "Flower",
            "Kannada": "ಹೂವು",
            "Hindi": "फूल",
            "Telugu": "పువ్వు"
        },
        example: "ತೋಟದಲ್ಲಿ ಹೂವು ಅರಳಿತು."
    },
    { 
        word: "आकाश",
        preferredLanguage: "Hindi",
        languagesKnown: ["Hindi", "English"],
        meanings: {
            "English": "Sky",
            "Kannada": "ಆಕಾಶ",
            "Hindi": "आकाश",
            "Telugu": "ఆకాశం"
        },
        example: "आकाश में तारे चमक रहे हैं।"
    },
    { 
        word: "पुस्तक",
        preferredLanguage: "Hindi",
        languagesKnown: ["Hindi", "English"],
        meanings: {
            "English": "Book",
            "Kannada": "ಪುಸ್ತಕ",
            "Hindi": "पुस्तक",
            "Telugu": "పుస్తకం"
        },
        example: "मैं पुस्तक पढ़ रहा हूं।"
    },
    { 
        word: "పుస్తకం",
        preferredLanguage: "Telugu",
        languagesKnown: ["Telugu", "English"],
        meanings: {
            "English": "Book",
            "Kannada": "ಪುಸ್ತಕ",
            "Hindi": "पुस्तक",
            "Telugu": "పుస్తకం"
        },
        example: "నేను పుస్తకం చదువుతున్నాను।"
    },
    { 
        word: "ఆకాశం",
        preferredLanguage: "Telugu",
        languagesKnown: ["Telugu", "English"],
        meanings: {
            "English": "Sky",
            "Kannada": "ఆకాశ",
            "Hindi": "आकाश",
            "Telugu": "ఆకాశం"
        },
        example: "ఆకాశంలో చుక్కలు మెరుస్తున్నాయి।"
    }
];

// Seed words into the database
async function seedWords() {
    try {
        // Clear existing words
        await Word.deleteMany({});
        console.log('Cleared existing words.');

        // Insert new words
        await Word.insertMany(wordsToSeed);
        console.log('Words seeded successfully.');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding words:', error);
        mongoose.connection.close();
    }
}

// Run the seeding
seedWords();