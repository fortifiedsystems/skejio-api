const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    seen: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
    timestamps: true,
}, {
    discriminatorKey: 'itemtype',
    collection: 'items',
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;