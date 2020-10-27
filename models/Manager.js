const mongoose = require('mongoose');
const User = require('./User');

const ManagerSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String,
        default: 'Manager',
    },
    teammates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teammate',
    }],
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
    }],
});

const Manager = User.discriminator('Manager', ManagerSchema);

module.exports = Manager;

