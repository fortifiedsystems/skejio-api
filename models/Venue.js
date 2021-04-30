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
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
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