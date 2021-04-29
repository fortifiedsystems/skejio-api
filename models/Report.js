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
        default: null
    },
    // Could be 'ticketed', 'free', 'coverCharge'
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
        default: null,
    },
    tixPrice: {
        type: Number,
        default: null,
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
    attendancePaid: {
        type: Number,
        default: null,
    },
    guests: {
        type: Number,
        default: null,
    },
    totalAttended: {
        type: Number,
        default: null,
    },
    totalMerchSales: {
        type: Number,
        default: null,
    },
    gross: {
        type: Number,
        default: null,
    },
    net: {
        type: Number,
        default: null,
    },
}, {
    timestamps: true,
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;