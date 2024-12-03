const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    word: { type: String, required: true },
    preferredLanguage: { type: String, required: true },
    meanings: {
        type: Object,
        required: true,
        validate: {
            validator: function(v) {
                return Object.keys(v).length > 0;
            },
            message: 'At least one meaning is required'
        }
    },
    example: { type: String }
});

module.exports = mongoose.model('words', wordSchema);