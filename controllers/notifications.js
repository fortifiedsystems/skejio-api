const db = require('../models');

const index = (req, res) => {
    db.Notification.find({ user: req.userId }, (err, foundNotifications) => {
        if (err) console.log(err);
        if (!foundNotifications) return res.status(404).json({
            msg: 'You have no notifications.'
        });

        return res.status(200).json({
            foundNotifications: foundNotifications,
        });
    });
}

const show = (req, res) => {
    try {
        db.Notification.findById(req.params.id, (err, foundNotification) => {
            if (err) console.log(err);
            if (!foundNotification) return res.status(404).json({
                msg: 'Could not find this notification',
            });

            return res.status(200).json({
                foundNotification: foundNotification,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const create = (req, res) => {
    try {
        db.Notification.create(req.body, async (err, createdNotification) => {
            if (err) console.log(err);

            const user = await db.User.findById(createdNotification.user);
            user.notifications.push(createdNotification._id);
            user.save();

            return res.status(201).json({
                createdNotification: createdNotification,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const update = (req, res) => {
    try {
        db.Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, updatedNotification) => {
                if (err) console.log(err);
                if (!updatedNotification) return res.status(404).json({
                    msg: 'Could not find this notification',
                });

                res.status(200).json({
                    updatedNotification: updatedNotification,
                })
            })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
}