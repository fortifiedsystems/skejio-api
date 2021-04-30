const mongoose = require('mongoose');

const MerchItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        maxLength: 32,
        minLength: 3
    },
    itemType: {
        type: String,
        required: true,
    },
    inventory: {
        type: Object,
        required: true,
        min: 0,
    },
    hasSizes: {
        type: Boolean,
        required: true
    },
    sizes: {
        type: [String],
        default: null
    },
    marketPrice: {
        type: Number,
        required: true,
        max: 5000,
        min: 0.01,
    },
    artistCost: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: null,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }
}, {
    timestamps: true,
});

const MerchItem = mongoose.model('MerchItem', MerchItemSchema);
module.exports = MerchItem;