const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourDateSchema = new Schema({

});

const TourDate = mongoose.model('TourDate', TourDateSchema);

module.exports = TourDate;