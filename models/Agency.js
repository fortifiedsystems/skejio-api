const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgencySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    agents: [{
        type: Schema.Types.ObjectId,
        ref: 'Agent',
    }]
});

const Agency = mongoose.model('Agency', AgencySchema);
module.exports = Agency;