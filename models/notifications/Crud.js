const mongoose = require('mongoose');
const Notification = require('../Notification');

const CrudSchema = new mongoose.Schema({
    message: {
        type: String,
        maxLength: 100,
        minLength: 3,
        required: true
    },
    updatedModel: {
        type: String,
        maxLength: 30,
        minLength: 3,
        required: true,
    }
});

const Crud = Notification.discriminator('Crud', CrudSchema);
module.exports = Crud;