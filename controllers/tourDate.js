const db = require('../models');


// GET index
const index = (req, res) => {
    db.TourDate.find(req.query, (err, foundTourDates) => {
        if (err) console.log('Error at tourDate#index:', err);
        if (!foundTourDates) res.status(200).json({
            'message': 'No tour dates assigned to this tour.'
        });

        res.status(200).json({
            'tourDates': foundTourDates,
        });
    });
}


// GET show
const show = (req, res) => {
    db.TourDate.findById(req.params.id, (err, foundTourDate) => {
        if (err) console.log('Error at tourDate#show', err);
        if (!foundTourDate) res.status(200).json({
            'message': 'Tour date not found.',
        });

        res.status(200).json({
            'tourDate': foundTourDate,
        });
    });
}


// POST create
const create = async (req, res) => {
    try {
        req.body.tour = req.params.tourId;
        const tour = await db.Tour.findById(req.params.tourId);
        db.TourDate.create(req.body, (err, createdTourDate) => {
            if (err) console.log('Error at tourDate#create:', err);
            tour.tourDates.push(createdTourDate);
            tour.save();

            res.status(201).json({ 'tourDate': createdTourDate })
        });
    } catch (err) {
        console.log('Error at tourDate#create:', err);
    }
}


// PUT update
const update = (req, res) => {
    db.TourDate.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedTourDate) => {
            if (err) console.log('Error at tourDate#update:', err);
            if (!updatedTourDate) res.status(200).json({
                "message": "Tour date does not exist."
            });

            res.status(200).json({
                'tourDate': updatedTourDate
            });
        });
}


// DELETE
const destroy = (req, res) => {
    db.TourDate.findByIdAndDelete(req.params.id, (err, deletedTourDate) => {
        if (err) console.log('Error at tourDate#delete:', err);
        if (!deletedTourDate) return res.status(200).json({
            "message": "Cannot delete a tour date that doesn't exist.",
        });

        res.status(200).json({
            'tourDate': deletedTourDate
        });
    });
}



// exports
module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}