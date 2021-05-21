const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InviteSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    inviteType: {
        type: String,
        maxLength: 30,
        minLength: 3,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const Invite = mongoose.model('Invite', InviteSchema);
module.exports = Invite;
