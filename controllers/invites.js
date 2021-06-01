const db = require('../models');

const create = async (req, res) => {
    const sendee = await db.User.findById(req.body.sendee);
    const sender = await db.User.findById(req.body.sender);

    try {
        db.Invite.create(req.body, async (err, invite) => {
            if (err) console.log('error at Invite#create:', err);

            const nf = await db.InviteNf.create({
                sender: req.body.sender,
                user: req.body.sendee,
                message: `${sender.firstName} ${sender.lastName} has invited you to work with them.`,
            });


            // NOTE Can only contain twenty notifications at a time.
            if (sendee.notifications.length === 20) {
                let deleted = sendee.notifications.shift();
                db.Notification.findByIdAndDelete(deleted._id);
                // NOTE May not need this but I'm not sure.
                // sendee.save();
            }

            sendee.notifications.push(nf._id);
            sendee.save();

            return res.status(201).json({
                msg: `Invite sent to ${sendee.firstName} ${sendee.lastName}`,
                invite: invite,
            });
        });
    } catch (error) {
        console.log(error);
    }
}




const acceptInvite = async (req, res) => {
    try {
        db.Invite.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            async (err, acceptedInvite) => {
                if (req.userId != acceptedInvite.sendee) return res.status(404).json({
                    msg: 'This is not your invite to accept.',
                });
                if (err) console.log('err at acceptInvite:', err);
                if (!acceptedInvite) return res.status(404).json({
                    msg: 'Could not find this invite.',
                });

                acceptedInvite.accepted = true;

                const sender = await db.User.findById(acceptedInvite.sender);
                const sendee = await db.User.findById(acceptedInvite.sendee);

                if (sender.__t === 'Artist') {
                    sender.manager = sendee._id;
                    sendee.artists.push(sender._id);
                } else {
                    sender.artists.push(sendee._id);
                    if (sender.__t === 'Manager') {
                        sendee.manager = sender._id;
                    } else if (sender.__t === 'Agent') {
                        sendee.agent = sender._id;
                    }
                }

                sender.save();
                sendee.save();

                return res.status(200).json({
                    msg: 'Invite Accepted',
                    acceptedInvite: acceptedInvite
                });
            }
        )
    } catch (error) {
        console.log(error);
    }
}




const rejectInvite = (req, res) => {
    try {
        db.Invite.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            async (err, rejectedInvite) => {
                if (req.userId != rejectedInvite.sendee) return res.status(404).json({
                    msg: 'This is not your invite to accept.',
                });
                if (err) console.log('err at acceptInvite:', err);
                if (!rejectedInvite) return res.status(404).json({
                    msg: 'Could not find this invite.',
                });

                rejectedInvite.rejected = true;

                return res.status(200).json({
                    msg: 'Invite Rejected',
                    rejectedInvite: rejectedInvite
                });
            }
        )
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    create,
    acceptInvite,
    rejectInvite
}