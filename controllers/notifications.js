const db = require('../models');

const create = async (req, res) => {
    let type = req.body.notifType;
    let sender = await db.User.findById(req.userId);
    let sendee = await db.User.findById(req.body.sendee);
    let senderName = `${sender.artistName}`;

    if (sender.__t === 'Artist') {
        let senderName = `${sender.artistName}`;
        if (type === 'Invited') {
            req.body.sender = req.userId

            try {
                db.Notifs.Invited.create(req.body, async (err, notif) => {
                    if (err) console.log('error at notifications#create#connected:', err);
                    if (req.body.inviteType === 'Manager') {
                        notif.message = `${senderName} has invited you to be their manager.`;
                    } else if (req.body.inviteType === 'Agent') {
                        notif.message = `${senderName} has invited you to be their agent.`
                    }

                    notif.sentTo.push(sendee._id);
                    sendee.notifications.push(notif);
                    sendee.save();

                    return res.status(201).json({
                        notif: notif
                    });
                });
            } catch (error) {
                console.log(error);
            }
        }
        // TODO Add more notification types as needed.
        // } else if (type === 'Connected') {

        // }
        // } else if (type === 'Crud') {

        // }
    } else if (sender.__t === 'Manager') {
        let senderName = `${sender.firstName} ${sender.lastName}`;
        if (type === 'Invited') {
            req.body.sender = req.userId;

            try {
                db.Notifs.Invited.create(req.body, async (err, notif) => {
                    if (err) console.log('error at notifications#create#connected:', err);
                    if (req.body.inviteType === 'Artist') {
                        notif.message = `${senderName} has asked to work with you as your manager`;
                    } else if (req.body.inviteType === 'Agent') {
                        notif.message = `${senderName} has asked to work with you as your booking agent.`
                    }

                    notif.sentTo.push(sendee._id);
                    sendee.notifications.push(notif);
                    sendee.save();

                    return res.status(201).json({
                        notif: notif
                    });
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
    // TODO Add more notification types as needed.
    // } else if (type === 'Connected') {

    // }
    // } else if (type === 'Crud') {

    // }

}

module.exports = {
    create,
}