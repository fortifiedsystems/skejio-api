const mongoose = require('mongoose');
const User = require('./User');

const TeammateSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAgent: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'Teammate',
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
    },
});

const Teammate = User.discriminator('Teammate', TeammateSchema);

module.exports = Teammate;