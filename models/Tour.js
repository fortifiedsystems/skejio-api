const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    region: String,
    tourDates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourDate',
    }],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
    }
});

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;