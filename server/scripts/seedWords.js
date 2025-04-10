const mongoose = require('mongoose');
const Word = require('../models/words'); // Ensure this points to your Word model

// MongoDB Connection
mongoose.connect('bro enter thr url here of mongo', {
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
            word: "Apple",
            preferredLanguage: "English",
            languagesKnown: ["English"],
            meanings: {
                English: "A round fruit with red, green, or yellow skin",
                Kannada: "ಸೇಬುಹಣ್ಣು",
                Hindi: "सेब",
                Telugu: "ఆపిల్"
            },
            example: "She ate an apple for breakfast."
        },
        {
            word: "Book",
            preferredLanguage: "English",
            languagesKnown: ["English"],
            meanings: {
                English: "A set of written pages bound together",
                Kannada: "ಪುಸ್ತಕ",
                Hindi: "पुस्तक",
                Telugu: "పుస్తకం"
            },
            example: "I borrowed a book from the library."
        },
        {
            word: "Chair",
            preferredLanguage: "English",
            languagesKnown: ["English"],
            meanings: {
                English: "A piece of furniture for sitting",
                Kannada: "ಕುರ್ಚಿ",
                Hindi: "कुर्सी",
                Telugu: "కుర్చీ"
            },
            example: "He sat on the chair near the window."
        },
        {
            word: "Dog",
            preferredLanguage: "English",
            languagesKnown: ["English"],
            meanings: {
                English: "A domestic animal often kept as a pet",
                Kannada: "ನಾಯಿ",
                Hindi: "कुत्ता",
                Telugu: "కుక్క"
            },
            example: "The dog barked loudly in the yard."
        },
        {
            word: "Sun",
            preferredLanguage: "English",
            languagesKnown: ["English"],
            meanings: {
                English: "The star that provides light and heat to Earth",
                Kannada: "ಸೂರ್ಯ",
                Hindi: "सूरज",
                Telugu: "సూర్యుడు"
            },
            example: "The sun sets in the west."
        },
        {
            word: "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ",
            preferredLanguage: "Kannada",
            languagesKnown: ["Kannada"],
            meanings: {
                Kannada: "ನನ್ನ ಆರೋಗ್ಯವು ಚೆನ್ನಾಗಿದೆ",
                English: "I am fine",
                Hindi: "मैं ठीक हूँ",
                Telugu: "నేను బాగున్నాను"
            },
            example: "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ ಎಂದು ಅವರು ಹೇಳಿದರು."
        },
        {
            word: "ಶುಭ ರಾತ್ರಿ",
            preferredLanguage: "Kannada",
            languagesKnown: ["Kannada"],
            meanings: {
                Kannada: "ರಾತ್ರಿ ಒಳ್ಳೆಯದು",
                English: "Good night",
                Hindi: "शुभ रात्रि",
                Telugu: "శుభ రాత్రి"
            },
            example: "ಮಗುವಿಗೆ ಶುಭ ರಾತ್ರಿ ಎಂದರು."
        },
        {
            word: "ನೀವು ಹೇಗಿದ್ದೀರಿ?",
            preferredLanguage: "Kannada",
            languagesKnown: ["Kannada"],
            meanings: {
                Kannada: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಹೇಗಿದೆ?",
                English: "How are you?",
                Hindi: "आप कैसे हैं?",
                Telugu: "మీరు ఎలా ఉన్నారు?"
            },
            example: "ಅವರು ಬಂದು, 'ನೀವು ಹೇಗಿದ್ದೀರಿ?' ಎಂದು ಕೇಳಿದರು."
        },
        {
            word: "ಧನ್ಯವಾದಗಳು",
            preferredLanguage: "Kannada",
            languagesKnown: ["Kannada"],
            meanings: {
                Kannada: "ಕೃತಜ್ಞತೆ",
                English: "Thanks",
                Hindi: "धन्यवाद",
                Telugu: "ధన్యవాదాలు"
            },
            example: "ಸಹಾಯಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು ಎಂದರು."
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
        word: "पानी",
        preferredLanguage: "Hindi",
        languagesKnown: ["Hindi"],
        meanings: {
            Hindi: "जीने के लिए जरूरी तरल",
            English: "Water",
            Kannada: "ನೀರು",
            Telugu: "నీరు"
        },
        example: "पानी पीना स्वास्थ्य के लिए अच्छा है।"
    },
    {
        word: "किताब",
        preferredLanguage: "Hindi",
        languagesKnown: ["Hindi"],
        meanings: {
            Hindi: "पढ़ने के लिए उपयोगी वस्तु",
            English: "Book",
            Kannada: "ಪುಸ್ತಕ",
            Telugu: "పుస్తకం"
        },
        example: "मैं किताब पढ़ रहा हूँ।"
    },
    {
        word: "सपना",
        preferredLanguage: "Hindi",
        languagesKnown: ["Hindi"],
        meanings: {
            Hindi: "नींद में देखा गया दृश्य",
            English: "Dream",
            Kannada: "ಕನಸು",
            Telugu: "కల"
        },
        example: "उसका सपना सच हो गया।"
    },
    {
        word: "फूल",
        preferredLanguage: "Hindi",
        languagesKnown: ["Hindi"],
        meanings: {
            Hindi: "पेड़ या पौधे का सुंदर हिस्सा",
            English: "Flower",
            Kannada: "ಹೂವು",
            Telugu: "పువ్వు"
        },
        example: "बगीचे में फूल खिले हुए हैं।"
    },
    {
        word: "हाथ",
        preferredLanguage: "Hindi",
        languagesKnown: ["Hindi"],
        meanings: {
            Hindi: "मानव शरीर का अंग",
            English: "Hand",
            Kannada: "ಕೈ",
            Telugu: "చేతి"
        },
        example: "वह अपने हाथ से काम करता है।"
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
        word: "నేను బాగున్నాను",
        preferredLanguage: "Telugu",
        languagesKnown: ["Telugu"],
        meanings: {
            Telugu: "నా ఆరోగ్యం బాగుంది",
            English: "I am fine",
            Hindi: "मैं ठीक हूँ",
            Kannada: "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ"
        },
        example: "నేను బాగున్నాను అని అతను చెప్పాడు."
    },

    {
        word: "నమస్కారం",
        preferredLanguage: "Telugu",
        languagesKnown: ["Telugu"],
        meanings: {
            Telugu: "సాదరంగా పలకరించడం",
            English: "Greetings",
            Hindi: "नमस्कार",
            Kannada: "ನಮಸ್ಕಾರ"
        },
        example: "అతను నాకు నమస్కారం చెప్పాడు."
    },
    {
        word: "శుభ రాత్రి",
        preferredLanguage: "Telugu",
        languagesKnown: ["Telugu"],
        meanings: {
            Telugu: "రాత్రి శుభమయంగా ఉండండి",
            English: "Good night",
            Hindi: "शुभ रात्रि",
            Kannada: "ಶುಭ ರಾತ್ರಿ"
        },
        example: "పిల్లలతో శుభ రాత్రి అని అన్నారు."
    },
    {
        word: "మీరు ఎలా ఉన్నారు?",
        preferredLanguage: "Telugu",
        languagesKnown: ["Telugu"],
        meanings: {
            Telugu: "మీ ఆరోగ్యం ఎలా ఉంది?",
            English: "How are you?",
            Hindi: "आप कैसे हैं?",
            Kannada: "ನೀವು ಹೇಗಿದ್ದೀರಿ?"
        },
        example: "అతను వచ్చి, 'మీరు ఎలా ఉన్నారు?' అని అడిగాడు."
    },
    {
        word: "ధన్యవాదాలు",
        preferredLanguage: "Telugu",
        languagesKnown: ["Telugu"],
        meanings: {
            Telugu: "కృతజ్ఞతలు",
            English: "Thanks",
            Hindi: "धन्यवाद",
            Kannada: "ಧನ್ಯವಾದಗಳು"
        },
        example: "సహాయానికి ధన్యవాదాలు చెప్పాడు."
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
