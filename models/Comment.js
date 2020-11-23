const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        minlength: 1,
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
    }
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;