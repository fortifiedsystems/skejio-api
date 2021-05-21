const mongoose = require('mongoose');
const Notification = require('../Notification');

const ConnectedSchema = new mongoose.Schema({
    content: {
        type: String,
        maxLength: 100,
        minLength: 3,
        required: true
    },
});

const Connected = Notification.discriminator('Connected', ConnectedSchema);
module.exports = Connected;