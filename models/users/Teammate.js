const mongoose = require('mongoose');
const User = require('./User');

const Schema = mongoose.Schema;

const TeammateSchema = new Schema({
    isAgent: {
        type: Boolean,
        default: false,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
    },
});

const Teammate = User.discriminator('Teammate', TeammateSchema);

module.exports = Teammate;