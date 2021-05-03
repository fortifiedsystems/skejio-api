const db = require('../models');

module.exports = async (req, res, next) => {
    const comment = await db.Comment.findById(req.params.id);

    if (req.userId != comment.author) {
        return res.status(403).json({
            msg: 'Only the author of this comment can delete it.'
        });
    }

    next();
}