const db = require('../models');

const index = (req, res) => {
    db.TourDate.find({ 'tour': req.params.tourId }, (err, foundTourDates) => {
        if (err) console.log('Error at tourDate#index:', err);
        if (!foundTourDates) res.status(500).json({
            'message': 'No tour dates assigned to this tour.'
        })
        res.status(200).json({
            'tourDates': foundTourDates
        })
    })
}

const create = (req, res) => {
    db.TourDate.create(req.body, (err, createdTourDate) => {
        req.body.tour = req.params.tourId
        if (err) console.log('Error at tourDate#create:', err);
        res.status(201).json({ 'tourDate': createdTourDate })
    });
}

module.exports = {
    create,
    index,
}