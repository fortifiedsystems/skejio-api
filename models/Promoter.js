const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('./users/constants');

const PromoterSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    // TODO add regex validation for proper phone number.
    phoneNumber: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        match: validate.EMAIL,
    },
    tourDate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourDate',
    }
});

const Promoter = mongoose.model('Promoter', PromoterSchema);

module.exports = Promoter;