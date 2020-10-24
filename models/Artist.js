const mongoose = require('mongoose');
const verify = require('./constants');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: verify.EMAIL,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        match: verify.PASSWORD,
    },
    artistName: String,
    profileImg: String,
    isAdmin: Boolean,
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
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
    }],
})

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;