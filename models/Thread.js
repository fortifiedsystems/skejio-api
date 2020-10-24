const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({

})

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;