const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tourdate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourdate',
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    seenBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    content: {
        type: String,
        required: true,
        maxlength: 1000,
        minlength: 1,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    edited: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;