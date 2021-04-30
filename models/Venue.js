const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = new Schema({
    venueId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: Object,
        required: true,
    },
    state: {
        type: Object,
        required: true,
    },
    country: {
        type: Object,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    address2: {
        type: Object,
        default: null,
    },
    zip: {
        type: String,
        required: true,
    },
    venueLink: {
        type: String,
        default: null,
    },
    locale: {
        type: String,
        default: null,
    },
    venueImage: {
        type: String,
        default: null,
    },
    timezone: {
        type: String,
        default: null,
    },
    capacity: {
        type: Number,
        default: null
    },
    // NOTE: maybe at this at some point. too complicated for mvp.
    // tourdates: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Tourdate'
    // }],
}, {
    timestamps: true
});


const Venue = mongoose.model('Venue', VenueSchema);
module.exports = Venue;