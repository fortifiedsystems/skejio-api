const db = require('../models');

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

const show = (req, res) => {
    db.Thread.findById(req.params.id, (err, foundThread) => {
        if (err) console.log('Error at thread#show:', err);
        if (!foundThread) res.status(200).json({
            'message': 'This thread does not exist.',
        });

        res.status(200).json({
            'thread': foundThread,
        });
    });
}

const create = async (req, res) => {
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

const update = (req, res) => {
    db.Thread.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedThread) => {
            if (err) console.log('Error at thread#update:', err);
            if (!updatedThread) res.status(200).json({
                'message': 'Cannot update thread that does not exist.',
            });

            res.status(201).json({
                'thread': updatedThread,
            });
        });
}

const destroy = (req, res) => {
    db.Thread.findByIdAndDelete(req.params.id, (err, deletedThread) => {
        if (err) console.log('Error at thread#delete:', err);
        if (!deletedThread) res.status(200).json({
            'message': 'Cannot delete a thread that does not exist.'
        });

        res.status(200).json({
            'thread': deletedThread,
        });
    });
}

module.exports = {
    index,
    dateIndex,
    show,
    create,
    update,
    destroy,
}