const db = require('../models');

/**
 * NOTE: show on the front end should use the thread id to call comments related to that thread.
 * @param {*} req 
 * @param {*} res 
 */
const index = (req, res) => {
    try {
        db.Comment.find(req.query)
            .populate({
                path: 'author',
            }).sort({
                createdAt: 'asc',
            }).exec((err, foundComments) => {
                if (err) console.log(err);
                if (!foundComments) return res.status(404).json({
                    msg: 'Could not find any comments',
                });

                return res.status(200).json({
                    foundComments: foundComments,
                });
            });
    } catch (error) {
        console.log(error);
    }
}

const show = (req, res) => {
    try {
        db.Comment.findById(req.params.id)
            .populate({
                path: 'author'
            }).exec((err, foundComment) => {
                if (err) console.log(err);
                if (!foundComment) return res.status(404).json({
                    msg: 'Could not find comment',
                });

                return res.status(200).json({
                    foundComment: foundComment,
                });
            });
    } catch (error) {
        console.log(error);
    }
}

const create = (req, res) => {
    req.body.author = req.userId;

    try {
        db.Comment.create(req.body, async (err, createdComment) => {
            if (err) console.log(err);

            const user = await db.User.findById(createdComment.author);
            user.comments.push(createdComment._id);
            user.save();

            const thread = await db.Thread.findById(createdComment.thread);
            thread.comments.push(createdComment._id);
            thread.save();

            return res.status(201).json({
                createdComment: createdComment,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const edit = (req, res) => {
    try {
        db.Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            async (err, editedComment) => {
                if (err) console.log('error at comment#edit:', err);
                if (!editedComment) return res.status(404).json({
                    msg: 'No comment with this id found.'
                });

                return res.status(200).json({
                    editedComment: editedComment,
                })
            })
    } catch (error) {
        console.log(error);
    }
}

const markAsSeen = (req, res) => {
    try {
        db.Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            async (err, seenComment) => {
                if (err) console.log('error at comment#markAsSeen:', err);
                if (!seenComment) return res.status(404).json({
                    msg: 'No comment with this id found',
                });

                if (!seenComment.seenBy.includes(req.userId)) {
                    seenComment.seenBy.push(req.userId);
                    seenComment.save();
                } else {
                    let index = seenComment.seenBy.indexOf(req.userId);
                    seenComment.seenBy.splice(index, 1);
                    seenComment.save();
                }

                return res.status(200).json({
                    seenComment: seenComment,
                });
            }
        )
    } catch (error) {
        console.log(error);
    }
}

const destroy = (req, res) => {
    try {
        db.Comment.findByIdAndDelete(req.params.id, async (err, deletedComment) => {
            if (err) console.log(err);
            if (!deletedComment) return res.status(404).json({
                msg: 'Could not find comment',
            });

            const thread = await db.Thread.findById(deletedComment.thread);
            let index = thread.comments.indexOf(deletedComment._id);
            thread.comments.splice(index, 1);
            thread.save();

            const user = await db.User.findById(deletedComment.author);
            index = user.comments.indexOf(deletedComment._id);
            user.comments.splice(index, 1);
            user.save();

            return res.status(200).json({
                deletedComment: deletedComment,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const markAsDeleted = (req, res) => {
    try {
        db.Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, deletedComment) => {
                if (err) console.log('Error at comment#markDeleted:', err);
                if (!deletedComment) return res.status(404).json({
                    msg: 'No comment with this id found',
                })

                return res.status(200).json({
                    deletedComment: deletedComment
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
    edit,
    markAsSeen,
    destroy,
    markAsDeleted,
}