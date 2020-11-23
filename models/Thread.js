const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    user: {
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
    content: {
        type: String,
        required: true,
        maxlength: 1000,
        minlength: 1,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
    }
}, {
    timestamps: true,
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;