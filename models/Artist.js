const mongoose = require('mongoose');
const User = require('./User');

const ArtistSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: true,
    },
    artistName: String,
    managerRate: {
        type: Number,
        default: 0,
    },
    agentRate: {
        type: Number,
        default: 0,
    },
    paidToDate: {
        type: Number,
        default: 0,
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
    },
    tours: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
    }],
});

const Artist = User.discriminator('Artist', ArtistSchema);

module.exports = Artist;