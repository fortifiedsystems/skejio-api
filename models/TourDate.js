const mongoose = require('mongoose');
const validate = require('../utils/constants');

const TourDateSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    loadIn: {
        type: Date,
        default: null,
    },
    doors: {
        type: Date,
        default: null,
    },
    showStart: {
        type: Date,
        default: null,
    },
    showEnd: {
        type: Date,
        default: null,
    },
    hospitality: {
        type: String,
        default: 'No hospitality info provided.'
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
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
    postShowFormSubmitted: {
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
        default: null,
    },
}, {
    timestamps: true,
});

const TourDate = mongoose.model('TourDate', TourDateSchema);

module.exports = TourDate;