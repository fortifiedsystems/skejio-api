const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    tourdates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourdate',
    }],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    gross: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;