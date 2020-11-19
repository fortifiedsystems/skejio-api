const mongoose = require('mongoose');
const User = require('./User');

const TeammateSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
        default: null,
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        default: null,
    }
});

const Teammate = User.discriminator('Teammate', TeammateSchema);
module.exports = Teammate;