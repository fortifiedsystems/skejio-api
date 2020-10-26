const db = require('../models');

const create = (req, res) => {
    db.TourDate.create(req.body, (err, createdTourDate) => {
        req.body.tour = req.params.tourId
        if (err) console.log('Error at tourDate#create:', err);
        res.status(201).json({ 'tourDate': createdTourDate })
    });
}

module.exports = {
    create,
}