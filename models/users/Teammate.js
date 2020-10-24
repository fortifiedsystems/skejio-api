const mongoose = require('mongoose');
const validate = require('./constants');

const Schema = mongoose.Schema;

const TeammateSchema = new Schema({
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
        match: validate.EMAIL,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        match: validate.PASSWORD,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAgent: {
        type: Boolean,
        default: false,
    },
    profileImg: String,
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
    },
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
}, {
    timestamps: true,
});

const Teammate = mongoose.model('Teammate', TeammateSchema);

module.exports = Teammate;