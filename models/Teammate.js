const mongoose = require('mongoose');
const User = require('./User');

const TeammateSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    }
});

const Teammate = User.discriminator('Teammate', TeammateSchema);
module.exports = Teammate;