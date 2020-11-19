const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    stNum: {
        type: String,
        default: null,
    },
    stName: {
        type: String,
        default: null,
    },
    address2: {
        type: String,
        default: null,
    },
    city: {
        type: String,
        default: null,
    },
    state: {
        type: String,
        default: null,
    },
    zip: {
        type: String,
        default: null,
    },
    logo: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        default: null,
    },
    managers: [{
        type: Schema.Types.ObjectId,
        ref: 'Manager',
    }],
})

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;