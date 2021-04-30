const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    tourdate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourdate',
        required: true,
    },
    // Could be 'percentage', 'guarantee', 'guarantee vs', 'bar cut', 'other'
    deal: {
        type: String,
        required: true
    },
    // Could be 'ticketed', 'door charge', 'free'
    eventType: {
        type: String,
        default: null
    },
    tixAvail: {
        type: Number,
        default: null,
    },
    tixSold: {
        type: Number,
        default: 0,
    },
    tixPrice: {
        type: Number,
        default: 0,
    },
    venueCut: {
        type: Number,
        default: null,
    },
    owedToManager: {
        type: Number,
        default: null,
    },
    owedToAgent: {
        type: Number,
        default: null,
    },
    comps: {
        type: Number,
        default: null,
    },
    compsAttended: {
        type: Number,
        default: null,
    },
    paidAttendance: {
        type: Number,
        default: null,
    },
    potentialAttendance: {
        type: Number,
        default: null,
    },
    actualAttendance: {
        type: Number,
        default: null
    },
    totalMerchSales: {
        type: Number,
        default: 0,
    },
    venueRateOnMerch: {
        type: Number,
        default: 0,
        min: 0,
        max: 1,
    },
    venueCutOfMerch: {
        type: Number,
        default: 0,
    },
    amountPaidByVenue: {
        type: Number,
        default: null,
    },
    barTotal: {
        type: Number,
        default: 0,
    },
    guarantee: {
        type: Number,
        default: null,
    },
    percent: {
        type: Number,
        default: 0.0,
        min: 0,
        max: 1,
    },
    vsPercent: {
        type: Number,
        default: 0.0,
        min: 0,
        max: 1,
    },
    breakPoint: {
        type: Number,
        default: null,
    },
    totalMoniesGenerated: {
        type: Number,
        default: 0,
    },
    comissions: {
        type: Number,
        default: 0,
    },
    gross: {
        type: Number,
        default: null
    },
    net: {
        type: Number,
        default: null,
    },
    notes: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;