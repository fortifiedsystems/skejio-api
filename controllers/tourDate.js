const db = require('../models');

const index = (req, res) => {
    db.TourDate.find({ 'tour': req.params.tourId }, (err, foundTourDates) => {
        if (err) console.log('Error at tourDate#index:', err);
        if (!foundTourDates) res.status(200).json({
            'message': 'No tour dates assigned to this tour.'
        });
        res.status(200).json({
            'tourDates': foundTourDates,
        });
    });
}

const show = (req, res) => {
    db.TourDate.findById(req.params.showId, (err, foundTourDate) => {
        if (err) console.log('Error at tourDate#show', err);
        if (!foundTourDate) res.status(200).json({
            'message': 'Tour date not found.',
        });
        res.status(200).json({
            'tourDate': foundTourDate,
        });
    });
}

const create = async (req, res) => {
    try {
        const tour = await db.Tour.findById(req.params.tourId);
        db.TourDate.create(req.body, (err, createdTourDate) => {
            if (err) console.log('Error at tourDate#create:', err);
            req.body.tour = req.params.tourId;
            tour.tourDates.push(createdTourDate);
            tour.save();
            res.status(201).json({ 'tourDate': createdTourDate })
        });
    } catch (err) {
        console.log('Error at tourDate#create:', err);
    }

}

module.exports = {
    create,
    index,
    show,
}