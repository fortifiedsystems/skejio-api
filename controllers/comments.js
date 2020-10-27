const db = require('../models');


// GET index 
const index = (req, res) => {
    db.Comment.find(req.query, (err, foundComments) => {
        if (err) console.log('Error at comment#index:', err);
        if (!foundComments) res.status(200).json({
            'message': 'No comments on this thread.'
        })

        res.status(200).json({
            'comments': foundComments
        });
    });
}


// GET show
const show = (req, res) => {
    db.Comment.findById(req.params.id, (err, foundComment) => {
        if (err) console.log('Error at comment#show:', err);
        if (!foundComment) res.status(200).json({
            'message': 'This comment does not exist.',
        });

        res.status(200).json({
            'comment': foundComment,
        });
    });
}


// POST create
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
            });
        });
    } catch (error) {
        console.log('Error at comments#create:', err);
    }
}


// PUT update
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


// DELETE
const destroy = (req, res) => {
    db.Comment.findByIdAndDelete(req.params.id, (err, deletedComment) => {
        if (err) console.log('Error at comment#delete', err);
        if (!deletedComment) res.status(200).json({
            'message': 'Cannot delete a comment that does not exist',
        });

        res.status(200).json({
            'comment': deletedComment,
        });
    });
}



// EXPORTS
module.exports = {
    create,
    index,
    show,
    update,
    destroy,
}