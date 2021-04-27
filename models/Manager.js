const mongoose = require('mongoose');
const User = require('./User');

const ManagerSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        default: null,
    },
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
    }],
    teammates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teammate',
    }],
});

const Manager = User.discriminator('Manager', ManagerSchema);
module.exports = Manager;

