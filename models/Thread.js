const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        default: {}
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
        default: {}
    },
    teammate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teammate',
        default: {}
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