const mongoose = require('mongoose');
const validate = require('./constants');


const UserSchema = new mongoose.Schema({
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
    profileImg: {
        type: String,
        default: '',
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
    }]
}, {
    timestamps: true,
});


const User = mongoose.model('User', UserSchema, {
    discriminatorKey: 'itemtype',
    collection: 'items',
});

module.exports = User;