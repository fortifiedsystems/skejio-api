const mongoose = require('mongoose');
const validate = require('../utils/constants');


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
        maxlength: 50,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        // match: validate.PASSWORD,
    },
    accountType: {
        type: String,
        required: true,
    },
    profileImg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        default: null,
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
    timestamps: true
}, {
    discriminatorKey: 'itemtype',
    collection: 'items',
});

const User = mongoose.model('User', UserSchema);

module.exports = User;