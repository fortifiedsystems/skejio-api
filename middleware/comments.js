const db = require('../models');

const isAuthor = async (req, res, next) => {
    const comment = await db.Comment.findById(req.params.id);

    if (req.userId != comment.author) {
        return res.status(403).json({
            msg: 'Only the author of this comment can delete it.'
        });
    }

    next();
}

const canCreateComment = async (req, res, next) => {
    const user = await db.User.findById(req.userId);
    const thread = await db.Thread.findById(req.body.thread);
    const tourdate = await db.Tourdate.findById(thread.tourdate);

    if (user.__t === 'Artist') {
        if (tourdate.artist != req.userId) {
            return res.status(403).json({
                msg: 'You are not authorized to comment on this thread.'
            });
        }
    } else {
        if (!user.artists.includes(tourdate.artist)) {
            return res.status(403).json({
                msg: 'You are not authorized to comment on this thread.',
            })
        }
    }

    next();
}

module.exports = {
    isAuthor,
    canCreateComment
}