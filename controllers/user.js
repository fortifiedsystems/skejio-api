const db = require('../models');


// GET index route
const index = (req, res) => {
    db.User.find({
        artistName: {
            $regex: req.query.artistName,
            $options: 'i'
        }
    }, (err, foundUsers) => {
        if (err) console.log('Error at users#index', err);
        if (!foundUsers) return res.status(404).json({
            message: 'No users exist.',
        });

        res.status(200).json({
            users: foundUsers,
        });
    });
}


// GET show route
const show = (req, res) => {
    db.User.findById(req.userId).populate({
        path: 'manager agent artists tours tourdates notifications',
        populate: {
            path: 'tourdates teammates company agency',
        },
    }).exec((err, foundUser) => {
        if (err) console.log('Error at users#show');
        if (!foundUser) return res.status(404).json({
            message: 'Could not find this user.',
        })

        res.status(200).json({
            user: foundUser,
        });
    });
}


// PUT update route
const update = (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedUser) => {
            if (err) console.log('Error at users#update');
            if (!updatedUser) return res.status(404).json({
                message: 'Could not find this user.',
            });

            res.status(200).json({
                updatedUser: updatedUser,
            });
        });
}


// DELETE destroy route
const destroy = async (req, res) => {
    try {
        const user = await db.User.findById(req.params.id);

        if (user.__t === 'Artist') {
            await db.Tour.deleteMany({ artist: req.params.id });
        }

        await db.Thread.deleteMany({ user: req.params.id });
        await db.Comment.deleteMany({ user: req.params.id });
        await db.Todos.deleteMany({ user: req.params.id });

        await db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
            if (err) console.log('Error at users#destroy');
            if (!deletedUser) return res.status(404).json({
                message: 'Could not find this user.',
            })

            res.status(200).json({
                deletedUser: deletedUser,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong. Try again.',
        });
    }
}




// exports
module.exports = {
    index,
    show,
    update,
    destroy,
}