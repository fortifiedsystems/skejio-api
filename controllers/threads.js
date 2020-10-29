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
        db.Thread.create(
            {
                ...req.body,
                user: req.userId,
                tourDate: req.params.dateId,
            },
            async (err, createdThread) => {
                if (err) console.log('Error at thread#create:', err);

                const date = await db.TourDate.findById(req.params.dateId);
                const user = await db.User.findById(req.userId);

                date.threads.push(createdThread);
                user.threads.push(createdThread);

                date.save();
                user.save();

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
        message: 'Teammates cannot create threads. Contact manager.'
    });

    try {
        db.Thread.findByIdAndDelete(req.params.id, async (err, deletedThread) => {
            if (err) console.log('Error at thread#delete:', err);
            if (!deletedThread) res.status(200).json({
                message: 'Could not find this thread.'
            });

            const tourDate = await db.TourDate.findById(deletedThread.tourDate);
            const user = await db.User.findById(deletedThread.user);
            const dateIndex = tourDate.threads.indexOf(req.params.id);
            const userIndex = user.threads.indexOf(req.params.id);

            tourDate.threads.splice(dateIndex, 1);
            user.threads.splice(userIndex, 1);

            tourDate.save();
            user.save();

            await db.Comment.deleteMany({ thread: deletedThread._id });

            res.status(200).json({
                'thread': deletedThread,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong. Try again.',
        });
    }
}



// EXPORTS
module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}