const mongoose = require('mongoose');
const User = require('./User');

const ArtistSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String,
        default: 'Artist',
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
    },
    tours: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
    }],
});

const Artist = User.discriminator('Artist', ArtistSchema);

module.exports = Artist;