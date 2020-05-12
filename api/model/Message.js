const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        max: 255,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    senderId: {
        type: String,
        max: 1024,
        min: 6
    },
    receiverId: {
        type: String,
        max: 1024,
        min: 6
    }
});

module.exports = mongoose.model('Message', messageSchema);