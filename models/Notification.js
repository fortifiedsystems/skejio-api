const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 10,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}, {
    discriminatorKey: 'itemtype',
    collection: 'items',
});

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;