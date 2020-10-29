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

module.exports = {
    cleanThreads
}