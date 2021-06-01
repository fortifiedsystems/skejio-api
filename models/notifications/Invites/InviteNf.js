const mongoose = require('mongoose');
const Notification = require('../../Notification');

const InviteNfSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    senderType: {
        type: String,
        required: true,
    },
    sendeeType: {
        type: String,
        required: true,
    }
});

const InviteNf = Notification.discriminator('InviteNf', InviteNfSchema);
module.exports = InviteNf;