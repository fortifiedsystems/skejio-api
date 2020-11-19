const mongoose = require('mongoose');
const User = require('./User');

const AgentSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: true,
    },
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
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
})

const Agent = User.discriminator('Agent', AgentSchema);
module.exports = Agent;