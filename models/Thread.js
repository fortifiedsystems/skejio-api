const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist' || 'Manager' || 'Teammate',
    },
    tourDate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourDate',
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    content: {
        type: String,
        maxlength: 300,
    },
}, {
    timestamps: true,
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;