const db = require('../models');


// GET index
const index = (req, res) => {
    db.Tour.find({}, (err, foundTours) => {
        if (err) console.log('Error in tour#index:', err);
        if (!foundTours.length) return res.status(200).json({
            "message": "You have not created a tour yet."
        });

        res.status(200).json({
            'tours': foundTours
        });
    });
}


// GET index of tours for specific options
const artistTourIndex = (req, res) => {
    db.Tour.find({ 'artist': req.params.artistId }, (err, foundTours) => {
        if (err) console.log('Error at tours#artistTourIndex:', err);
        if (!foundTours.length) return res.status(200).json({
            'message': 'There are no tours scheduled for this artist.'
        });

        res.status(200).json({
            'tours': foundTours,
        });
    });
}


// GET show
const show = (req, res) => {
    db.Tour.findById(req.params.id, (err, foundTour) => {
        if (err) console.log('Error in tour#show:', err);
        if (!foundTour) return res.status(200).json({
            "message": "There is no tour with this id"
        });

        res.status(200).json({ "tours": foundTour });
    });
}


// POST create
const create = (req, res) => {
    db.Tour.create({ ...req.body, artist: req.userId }, (err, savedTour) => {
        if (err) console.log('Error in tour#create:', err);

        res.status(201).json({ 'tour': savedTour });
    });
}


// PUT update
const update = (req, res) => {
    db.Tour.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTour) => {
        if (err) console.log('Error in tour#update:', err);
        if (!updatedTour) return res.status(200).json({
            "message": "No tour with that id found in DB"
        });

        res.status(200).json({ 'tour': updatedTour });
    });
}


// DELETE
const destroy = (req, res) => {
    db.Tour.findByIdAndDelete(req.params.showId, (err, deletedTour) => {
        if (err) console.log('Error in tour#destroy:', err);
        if (!deletedTour) return res.status(200).json({
            "message": "No tour with that id found in DB",
        });

        res.status(200).json({
            "tour": deletedTour
        });
    });
}


// exports
module.exports = {
    index,
    artistTourIndex,
    show,
    create,
    update,
    destroy,
}