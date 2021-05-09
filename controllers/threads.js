const db = require('../models');
const errors = require('../utils/errors');
const { canRead, canCreate, canEditOrDelete } = require('../utils/authorization');



const index = (req, res) => {
    try {
        db.Thread.find(req.query)
            .populate({
                path: 'author comments author',
                options: {
                    sort: {
                        createdAt: 'asc',
                    }
                },
            }).exec((err, foundThreads) => {
                if (err) console.log(err);
                if (!foundThreads) return res.status(404).json({
                    msg: 'Did not find any threads',
                });

                return res.status(200).json({
                    foundThreads: foundThreads,
                });
            });
    } catch (error) {
        console.log(error);
    }
}



const show = (req, res) => {
    try {
        db.Thread.findById(req.params.id, (err, foundThread) => {
            if (err) console.log(err);
            if (!foundThread) return res.status(404).json({
                msg: 'Thread not found',
            });

            return res.status(200).json({
                foundThread: foundThread,
            });
        });
    } catch (error) {
        console.log(error);
    }
}



const create = async (req, res) => {
    const author = await db.User.findById(req.body.author);
    const tourdate = await db.Tourdate.findById(req.body.tourdate);
    const authorized = canCreate(req, author, 'Thread');

    if (!authorized) return res.status(403).json({
        msg: errors.UNAUTHORIZED,
    });

    try {
        db.Thread.create(req.body, async (err, createdThread) => {
            if (err) console.log(err);

            author.threads.push(createdThread);
            author.save();

            tourdate.threads.push(createdThread);
            tourdate.save();

            return res.status(201).json({
                createdThread: createdThread,
            });
        });
    } catch (error) {
        console.log(error);
    }
}



const update = async (req, res) => {
    try {
        const thread = await db.Thread.findById(req.params.id);

        if (thread.author != req.userId) return res.status(403).json({
            msg: 'You are not authorized to edit this thread',
        });

        db.Thread.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, updatedThread) => {
                if (err) console.log(err);
                if (!updatedThread) return res.status(404).json({
                    msg: 'Could not find thread',
                });

                return res.status(200).json({
                    updatedThread: updatedThread,
                });
            });
    } catch (error) {
        console.log(error);
    }
}



const destroy = async (req, res) => {
    try {
        const thread = await db.Thread.findById(req.params.id);

        if (thread.author != req.userId) return res.status(403).json({
            msg: 'You are not authorized to delete this thread',
        });

        db.Thread.findByIdAndDelete(req.params.id, async (err, deletedThread) => {
            if (err) console.log(err);
            if (!deletedThread) return res.status(404).json({
                msg: 'Thread not found',
            });

            // FIXME
            // delete is a problem because i can't get rid of all of the comments inside each user.
            // try a clean function that cleans out comments belonging to threads that don't exist everytime the use logs in.

            const user = await db.User.findById(deletedThread.author);
            let index = user.threads.indexOf(deletedThread._id);
            user.threads.splice(index, 1);
            user.save();

            const tourdate = await db.Tourdate.findById(deletedThread.tourdate);
            index = tourdate.threads.indexOf(deletedThread._id);
            tourdate.threads.splice(index, 1);
            tourdate.save();

            await db.Comment.deleteMany({ thread: deletedThread._id });

            return res.status(200).json({
                deletedThread: deletedThread,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}