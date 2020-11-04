const db = require('../models');


// GET index 
const index = (req, res) => {
    db.Comment.find(req.query, (err, foundComments) => {
        if (err) console.log('Error at comment#index:', err);
        if (!foundComments.length) return res.status(404).json({
            message: 'No comments on this thread.'
        });

        return res.status(200).json({
            'comments': foundComments
        });
    });
}


// GET show
const show = (req, res) => {
    try {
        db.Comment.findById(req.params.id, (err, foundComment) => {
            if (err) console.log('Error at comment#show:', err);
            if (!foundComment) return res.status(404).json({
                message: 'This comment does not exist.',
            });

            return res.status(200).json({
                comment: foundComment,
            });
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again.',
        });
    }
}


// POST create
const create = async (req, res) => {
    try {
        db.Comment.create(
            req.body,
            async (err, createdComment) => {
                if (err) console.log('Error at comments#create:', err);
                const thread = await db.Thread.findById(req.body.thread);
                const user = await db.User.findById(req.body.user);

                if (!thread || !user) return res.status(404).json({
                    message: 'Comments cannot be created without a thread',
                })

                thread.comments.push(createdComment);
                user.comments.push(createdComment);

                thread.save();
                user.save();

                return res.status(201).json({
                    'comment': createdComment
                });
            });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again.',
        });
    }
}


// PUT update
const update = (req, res) => {
    if (req.userId !== req.body.user) {
        return res.status(403).json({
            message: 'Can\'t edit a comment you did not write.',
        });
    }

    db.Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedComment) => {
            if (err) console.log('Error at comments#update:', err);
            if (!updatedComment) return res.status(404).json({
                message: 'Comment does not exist.',
            });

            return res.status(201).json({
                comment: updatedComment,
            });
        });
}


// DELETE
const destroy = (req, res) => {
    try {
        db.Comment.findByIdAndDelete(req.params.id, async (err, deletedComment) => {
            if (err) console.log('Error at comment#delete', err);
            if (!deletedComment) res.status(200).json({
                message: 'Cannot delete a comment that does not exist',
            });

            const thread = await db.Thread.findById(deletedComment.thread);
            const user = await db.User.findById(req.userId);

            if (!thread || !user) return res.status(404).json({
                message: 'Thread or user undefined.',
            })

            if (user._id === thread.user) return res.status(403).json({
                message: 'Cannot delete a comment you did not write',
            });

            const threadIndex = thread.comments.indexOf(deletedComment._id);
            const userIndex = user.comments.indexOf(deletedComment._id);

            thread.comments.splice(threadIndex, 1);
            user.comments.splice(userIndex, 1);

            thread.save();
            user.save();

            return res.status(200).json({
                comment: deletedComment,
            });
        });
    } catch (error) {
        res.status(200).json({
            message: 'Something went wrong. Try again.'
        });
    }
}



// EXPORTS
module.exports = {
    create,
    index,
    show,
    update,
    destroy,
}