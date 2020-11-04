const db = require('../models');


// GET index
const index = (req, res) => {
    db.Tour.find(req.query, (err, foundTours) => {
        if (err) console.log('Error in tour#index:', err);
        if (!foundTours) return res.status(200).json({
            "message": "You have not created a tour yet."
        });

        res.status(200).json({
            'tours': foundTours
        });
    });
}


// GET show
const show = (req, res) => {
    db.Tour.findById(req.params.id)
        .populate({
            path: 'tourDates',
        })
        .exec((err, foundTour) => {
            if (err) console.log('Error in tour#show:', err);
            if (!foundTour) return res.status(200).json({
                "message": "There is no tour with this id"
            });

            res.status(200).json({ "tours": foundTour });
        });
}


// POST create
const create = async (req, res) => {
    if (req.userType === 'Teammate') res.status(403).json({
        'message': 'You are not authorized to create a tour. Contact the manager of this artist.',
    });

    try {
        console.log(req.body);
        const artist = await db.Artist.findById(req.body.artist);
        db.Tour.create(req.body, (err, savedTour) => {
            if (err) console.log('Error in tour#create:', err);
            artist.tours.push(savedTour);
            artist.save();

            res.status(201).json({
                tour: savedTour
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong. Try again.',
        })
    }
}


// PUT update
const update = (req, res) => {
    if (req.userType === 'Teammate') res.status(403).json({
        'message': 'You are not authorized to update a tour. Contact the manager of this artist.',
    });

    db.Tour.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTour) => {
        if (err) console.log('Error in tour#update:', err);
        if (!updatedTour) return res.status(200).json({
            "message": "No tour with that id found in DB"
        });

        res.status(200).json({ 'tour': updatedTour });
    });
}


// DELETE
const destroy = async (req, res) => {
    if (req.userType === 'Teammate') res.status(403).json({
        message: 'You are not authorized to delete a tour. Contact the manager of this artist.',
    });

    try {
        db.Tour.findByIdAndDelete(req.params.id, async (err, deletedTour) => {
            if (err) console.log('Error in tour#destroy:', err);
            if (!deletedTour) return res.status(200).json({
                message: 'Tour does not exist',
            });

            const artist = await db.Artist.findById(deletedTour.artist);
            const index = artist.tours.indexOf(deletedTour._id);

            artist.tours.splice(index, 1);
            artist.save();

            await db.TourDate.deleteMany({ tour: deletedTour._id });

            res.status(200).json({
                deletedTour: deletedTour
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong. Try again.',
        });
    }
}


// exports
module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}