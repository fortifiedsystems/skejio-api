const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
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
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artists',
    }],
    teammates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teammates',
    }],
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        default: null,
    },
})

/**
 * @method getAddress()
 * @description returns full address in string form if 
 * there is a full address. Returns message otherwise.
 */
CompanySchema.methods.getAddress = function () {
    const fullAddress = this.stNum && this.stName && this.address && this.address2 && this.city && this.stateCode && this.zip;
    const noAdd2 = this.stNum && this.stName && this.city && this.stateCode && this.zip;
    const INVALID_ADDRESS = 'Full address not provided. Please request from company.';

    if (fullAddress) {
        return `${this.name}
        ${this.stNum} ${this.stName}
        ${this.address} ${this.address2}
        ${this.city}, ${this.stateCode} ${this.zip}`;
    } else if (noAdd2) {
        return `${this.name}
        ${this.stNum} ${this.stName}
        ${this.address2}
        ${this.city}, ${this.stateCode} ${this.zip}`;
    } else {
        return INVALID_ADDRESS;
    }
}

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;