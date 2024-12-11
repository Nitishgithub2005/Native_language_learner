const express = require('express');
const Word = require('../models/words'); // MongoDB model
const router = express.Router();

router.get('/words', async (req, res) => {
    try {
        const language = req.query.language;
        console.log('Requested language:', language);

        // Check if language is provided
        if (!language) {
            return res.status(400).json({ message: 'Language query parameter is required' });
        }

        // Ensure the language matches exactly (case-sensitive)
        const words = await Word.find({
            $or: [
                { preferredLanguage: language },
                { 'meanings': { $elemMatch: { $exists: true } } }
            ]
        });

        console.log('Found words:', words);

        if (words.length === 0) {
            return res.status(404).json({ message: 'No words found for this language' });
        }

        res.json(words);
    } catch (error) {
        console.error('Error fetching words:', error);
        res.status(500).json({ message: 'Server error fetching words', error: error.message });
    }
});

module.exports = router;