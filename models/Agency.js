const mongoose = require('mongoose');
const Company = require('./Company');
const Schema = mongoose.Schema;

const AgencySchema = new Schema({
    agents: [{
        type: Schema.Types.ObjectId,
        ref: 'Agent',
    }],
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Agent',
        default: null,
    },
});

const Agency = Company.discriminator('Agency', AgencySchema);
module.exports = Agency;