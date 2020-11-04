const db = require('../models');


// GET index
const index = (req, res) => {
    console.log(req.query);
    db.TourDate.find(req.query, (err, foundTourDates) => {
        if (err) console.log('Error at tourDate#index:', err);
        if (!foundTourDates) return res.status(404).json({
            message: 'No tour dates assigned to this tour.'
        });

        res.status(200).json({
            tourDates: foundTourDates,
        });
    });
}


// GET show
const show = (req, res) => {
    db.TourDate.findById(req.params.id)
        .populate({
            // this might be a problem.
            path: 'threads todos',
            populate: {
                path: 'comments',
            }
        })
        .exec((err, foundTourDate) => {
            if (err) console.log('Error at tourDate#show', err);
            if (!foundTourDate) return res.status(404).json({
                message: 'Tour date not found.',
            });

            res.status(200).json({
                tourDate: foundTourDate,
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
            if (!updatedTourDate) return res.status(404).json({
                message: 'Tour date does not exist.',
            });

            res.status(200).json({
                tourDate: updatedTourDate
            });
        });
}


// DELETE
const destroy = (req, res) => {
    try {
        db.TourDate.findByIdAndDelete(req.params.id, async (err, deletedTourDate) => {
            if (err) console.log('Error at tourDate#delete:', err);
            if (!deletedTourDate) return res.status(404).json({
                message: 'Could not find tour date',
            });

            const tour = await db.Tour.findById(deletedTourDate.tour);
            let index = tour.tourDates.indexOf(deletedTourDate._id);
            tour.tourDates.splice(index, 1);
            tour.save();

            await db.Thread.deleteMany({ tourDate: deletedTourDate._id });
            await db.Todo.deleteMany({ tourDate: deletedTourDate._id });

            res.status(200).json({
                tourDate: deletedTourDate
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