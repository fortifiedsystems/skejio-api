const db = require('../models');

const create = async (req, res) => {
    try {
        req.body.thread = req.params.threadId;
        const thread = await db.Thread.findById(req.params.threadId);
        db.Comment.create(req.body, (err, createdComment) => {
            if (err) console.log('Error at comments#create:', err);
            thread.comments.push(createdComment);
            thread.save();

            res.status(201).json({
                'comment': createdComment
            })
        });
    } catch (error) {
        console.log('Error at comments#create:', err);
    }

}

module.exports = {
    create,
}