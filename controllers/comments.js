const db = require('../models');

/**
 * NOTE: show on the front end should use the thread id to call comments related to that thread.
 * @param {*} req 
 * @param {*} res 
 */
const show = (req, res) => {
    try {
        db.Comment.find(req.params.threadId, (err, foundComments) => {
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

const create = (req, res) => {
    try {
        db.Comment.create(req.body, async (err, createdComment) => {
            if (err) console.log(err);

            const user = db.User.findById(createdComment.user);
            user.comments.push(createdComment._id);
            user.save();

            const thread = db.Thread.findById(createdComment.thread);
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

const update = (req, res) => {
    try {
        db.Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, updatedComment) => {
                if (err) console.log(err);
                if (!updatedComment) return res.status(404).json({
                    msg: 'Could not find comment',
                });

                return res.status(200).json({
                    updatedComment: updatedComment,
                });
            });
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

            const thread = db.Thread.findById(deletedComment.thread);
            let index = thread.comments.indexOf(deletedComment._id);
            thread.comments.splice(index, 1);
            thread.save();

            const user = db.User.findById(deletedComment.author);
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

module.exports = {
    show,
    create,
    update,
    destroy,
}