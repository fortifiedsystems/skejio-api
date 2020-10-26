const mongoose = require('mongoose');
const validate = require('./constants');

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
    fee: {
        type: Number,
        default: 0,
    },
    deposit: {
        type: Number,
        default: 0,
    },
    depositReceived: {
        type: Boolean,
        default: false,
    },
    contract: String,
    contractSigned: {
        type: Boolean,
        default: false,
    },
    paidInFull: {
        type: Boolean,
        default: false,
    },
    promoterName: {
        type: String,
        default: '',
    },
    promoterEmail: {
        type: String,
        match: validate.EMAIL,
    },
    promoterPhone: {
        type: String,
        match: validate.PHONE,
    },
    complete: {
        type: Boolean,
        default: false,
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