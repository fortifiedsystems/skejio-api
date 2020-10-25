const mongoose = require('mongoose');
const validate = require('./users/constants');

const TourDateSchema = new mongoose.Schema({
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
    promoterName: {
        type: String,
        default: '',
    },
    promoterEmail: {
        type: String,
        match: validate.EMAIL,
    },
    // TODO validate this field.
    promoterPhone: {
        type: String,
    },
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
    }],
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
    }],
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
    },
}, {
    timestamps: true,
});

const TourDate = mongoose.model('TourDate', TourDateSchema);

module.exports = TourDate;