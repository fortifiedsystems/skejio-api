const db = require('../models');


// GET index
const index = (req, res) => {
    db.Thread.find(req.query, (err, foundThreads) => {
        if (err) console.log('Error at threads#index:', err);
        if (!foundThreads) res.status(200).json({
            'message': 'No thread exists.'
        });

        res.status(200).json({
            'threads': foundThreads,
        });
    });
}


// GET show
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


// POST create
const create = async (req, res) => {
    if (req.userType === 'Teammate') return res.status(403).json({
        'message': 'Teammates cannot create threads. Contact manager.'
    });

    try {
        const date = await db.TourDate.findById(req.params.dateId);
        db.Thread.create(
            {
                ...req.body,
                user: req.userId,
                tourDate: req.params.dateId,
            },
            (err, createdThread) => {
                if (err) console.log('Error at thread#create:', err);
                date.threads.push(createdThread);
                date.save();

                res.status(201).json({
                    'thread': createdThread,
                });
            });
    } catch (err) {
        console.log('Error at thread#create:', err);
    }
}


// PUT update
const update = (req, res) => {
    if (req.userType === 'Teammate') return res.status(403).json({
        'message': 'Teammates cannot update threads. Contact manager.'
    });

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


// DELETE
const destroy = (req, res) => {
    if (req.userType === 'Teammate') return res.status(403).json({
        'message': 'Teammates cannot create threads. Contact manager.'
    });

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



// EXPORTS
module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}