const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    invite: {
        type: Boolean,
        default: false,
    },
    tourdate: {
        type: Boolean,
        default: false,
    },
    newThread: {
        type: Boolean,
        default: false,
    },
    newComment: {
        type: Boolean,
        default: false,
    },
    newTodo: {
        type: Boolean,
        default: false,
    },
    checked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;