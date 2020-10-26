const db = require('../models');
const tourDate = require('./tourDate');

const index = (req, res) => {
    db.Thread.find({}, (err, foundThreads) => {
        if (err) console.log('Error at threads#index:', err);
        if (!foundThreads) res.status(200).json({
            'message': 'No thread exists.'
        });

        res.status(200).json({
            'threads': foundThreads,
        });
    });
}

const dateIndex = (req, res) => {
    db.Thread.find({ 'tourDate': dateId }, (err, foundThreads) => {
        if (err) console.log('Error at threads#dateIndex', err);
        if (!foundThreads) res.status(200).json({
            'message': 'No threads exist for this date.'
        });

        res.status(200).json({
            'threads': foundThreads,
        });
    });
}

const create = async (req, res) => {
    // TODO attach a user to each thread upon creation.
    try {
        req.body.tourDate = req.params.dateId;
        const date = await db.TourDate.findById(req.params.dateId);
        db.Thread.create(req.body, (err, createdThread) => {
            if (err) console.log('Error at thread#create:', err);
            date.threads.push(createdThread);
            date.save();

            res.status(201).json({
                'thread': createdThread,
            });
        })
    } catch (err) {
        console.log('Error at thread#create:', err);
    }
}

module.exports = {
    index,
    dateIndex,
    create,
}