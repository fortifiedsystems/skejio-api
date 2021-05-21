const mongoose = require('mongoose');
const Notification = require('../Notification');

const InvitedSchema = new mongoose.Schema({
    content: {
        type: String,
        maxLength: 100,
        minLength: 3,
        required: true
    },
});

const Invited = Notification.discriminator('Invited', InvitedSchema);
module.exports = Invited;