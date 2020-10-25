const mongoose = require('mongoose');
const User = require('./User');

const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
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

