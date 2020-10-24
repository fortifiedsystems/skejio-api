const mongoose = require('mongoose');
const validate = require('./constants');

const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
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
        default: true,
    },
    profileImg: String,
    teammates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teammate',
    }],
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
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
    }]
}, {
    timestamps: true,
});

const Manager = mongoose.model('Manager', ManagerSchema);

module.exports = Manager;

