const db = require('../models');

const index = (req, res) => {
    try {
        db.Thread.find(req.query, (err, foundThreads) => {
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

const create = (req, res) => {
    try {
        db.Thread.create(req.body, async (err, createdThread) => {
            if (err) console.log(err);

            const author = await db.User.findById(req.body.author);
            author.threads.push(createdThread);
            author.save();

            const tourdate = await db.Tourdate.findById(req.body.tourdate);
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
            msg: 'You are not authorized to edit this thread',
        });

        db.Thread.findByIdAndDelete(req.params.id, async (err, deletedThread) => {
            if (err) console.log(err);
            if (!deletedThread) return res.status(404).json({
                msg: 'Thread not found',
            });

            const user = await db.User.findById(deletedThread.author);
            let index = user.threads.indexOf(deletedThread._id);
            user.threads.splice(index, 1);
            user.save();

            const tourdate = await db.Tourdate.findById(deletedThread.tourdate);
            index = tourdate.threads.indexOf(deletedThread._id);
            tourdate.threads.splice(index, 1);
            tourdate.save();

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