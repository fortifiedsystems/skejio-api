const mongoose = require('mongoose');
const Notification = require('../Notification');

const InvitedSchema = new mongoose.Schema({
    message: {
        type: String,
        maxLength: 100,
        minLength: 3,
        required: true
    },
    inviteType: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Invited = Notification.discriminator('Invited', InvitedSchema);
module.exports = Invited;