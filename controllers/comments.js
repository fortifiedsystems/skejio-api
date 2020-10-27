const db = require('../models');

const index = (req, res) => {
    db.Comment.find({}, (err, foundComments) => {
        if (err) console.log('Error at comment#index:', err);
        if (!foundComments) res.status(200).json({
            'message': 'No comments on this thread.'
        })

        res.status(200).json({
            'comments': foundComments
        });
    });
}

const threadIndex = (req, res) => {
    db.Comment.find({ 'thread': req.params.threadId }, (err, foundComments) => {
        if (err) console.log('Error at comments#threadIndex', err);
        if (!foundComments) res.status(200).json({
            'message': 'No threads exist for this date.'
        });

        res.status(200).json({
            'comments': foundComments,
        });
    });
}

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

const update = (req, res) => {
    db.Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedComment) => {
            if (err) console.log('Error at comments#update:', err);
            if (!updatedComment) res.status(200).json({
                'message': 'Cannot update comment that does not exist.',
            });

            res.status(201).json({
                'comment': updatedComment,
            });
        });
}



module.exports = {
    create,
    index,
    threadIndex,
    update,
}