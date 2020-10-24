const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourDateSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
    },
    fee: Number,
    deposit: Number,
    depositReceived: Boolean,
    contract: String,
    contractSigned: Boolean,
    paidInFull: Boolean,
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
    }],
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
    }],
    promoter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promoter',
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
    },
});

const TourDate = mongoose.model('TourDate', TourDateSchema);

module.exports = TourDate;