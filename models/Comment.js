const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;