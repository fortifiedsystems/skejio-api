const mongoose = require('mongoose');
const Company = require('./Company');
const Schema = mongoose.Schema;

const MgmtSchema = new Schema({
    managers: [{
        type: Schema.Types.ObjectId,
        ref: 'Manager',
    }],
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Manager',
        default: null,
    },
});

const Mgmt = Company.discriminator('Mgmt', MgmtSchema);
module.exports = Mgmt;