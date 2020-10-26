const db = require('../models');


// TODO adjust for authorization levels. On all methods.
const index = (req, res) => {
    db.Tour.find({}, (err, foundTours) => {
        if (err) console.log('Error in tour#index:', err);
        if (!foundTours.length) return res.status(200).json({
            "message": "You have not created a tour yet."
        });

        res.status(200).json({ "tours": foundTours });
    })
}

const show = (req, res) => {
    db.Tour.findOne({ _id: req.params.id }, (err, foundTour) => {
        if (err) console.log('Error in tour#show:', err);
        if (!foundTour) return res.status(200).json({
            "message": "There is no tour with this id"
        })

        res.status(200).json({ "tours": foundTour });
    })
}

const create = (req, res) => {
    db.Tour.create(req.body, (err, savedTour) => {
        if (err) console.log('Error in tour#create:', err);
        // TODO assign artistId to req.body.artist
        // 1. Get id of current user
        // 2. if current user is a teammate, return Unauthorized error
        // 3. if artist or manager, assign id to req.body.artist
        // 3a. Will need to have a dropdown if user creating tour is a manager so they can select from artists.

        res.status(201).json({ "tour": savedTour });
    });
}

const update = (req, res) => {
    db.Tour.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTour) => {
        if (err) console.log('Error in tour#update:', err);
        if (!updatedTour) return res.status(200).json({
            "message": "No tour with that id found in DB"
        });

        res.status(200).json({ 'tour': updatedTour });
    })
}

const destroy = (req, res) => {
    db.Tour.findByIdAndDelete(req.params.id, (err, deletedTour) => {
        if (err) console.log('Error in tour#destroy:', err);
        if (!deletedTour) return res.status(200).json({
            "message": "No tour with that id found in DB",
        })

        res.status(200).json({
            "tour": deletedGame
        });
    })
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}