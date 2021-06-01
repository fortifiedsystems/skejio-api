const db = require('../models');

const markAsRead = (req, res) => {
    try {
        db.Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, updatedNf) => {
                if (err) console.log('Error at notifications#markAsRead:', err);
                if (!updatedNf) return res.status(404).json({
                    status: 404,
                    message: 'Notification not found.',
                });

                updatedNf.read = true;

                return res.status(200).json({
                    message: 'Notification has been marked as read.',
                    notification: updatedNf,
                });
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    markAsRead
}