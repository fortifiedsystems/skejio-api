const db = require('../models');

const cleanThreads = async (threadId) => {
    try {
        const thread = await db.Thread.findById(threadId);
        const date = await db.TourDate.find({ _id: thread.tourDate });

        if (date === null) {
            db.Thread.findByIdAndDelete(threadId, (err, deletedThread) => {
                if (err) console.log('Error at utilities#cleanThreads', err);

                db.Comment.deleteMany({ thread: deletedThread._id });

                res.status(200).json({
                    deletedThread: deletedThread,
                });
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong. Try again.',
        });
    }
}

const checkPrivilage = (req, user, model) => {
    if (user.__t === 'Teammate') {
        return false;
    } else if (user.__t === 'Artist') {
        if (req.userId != model.artist) {
            return false;
        }
    } else if (user.__t === 'Manager' || user.__t === 'Agent') {
        if (!user.artists.includes(model.artist)) {
            return false;
        }
    }
    return true;
}

const adjustParams = (req, user) => {
    if (user.__t === 'Artist') {
        req.body.artist = req.userId;
        return true;
    } else if (user.__t === 'Teammate') {
        return false;
    } else {
        if (!user.artists.includes(req.body.artist)) {
            return false;
        }
    }

    return true;
}

module.exports = {
    cleanThreads,
    checkPrivilage,
    adjustParams,
}