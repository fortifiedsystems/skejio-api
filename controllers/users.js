const db = require('../models');


// GET index route
const index = (req, res) => {
    db.User.find(req.query, (err, foundUsers) => {
        if (err) console.log('Error at users#index');
        if (!foundUsers) return res.status(404).json({
            message: 'Could not find any users.',
        });

        res.status(200).json({
            users: foundUsers,
        });
    });
}


// GET show route
const show = (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
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
const destroy = (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if (err) console.log('Error at users#destroy');
        if (!deletedUser) return res.status(404).json({
            message: 'Could not find this user.',
        })

        res.status(200).json({
            deletedUser: deletedUser,
        })
    })
}




// exports
module.exports = {
    index,
    show,
    update,
    destroy,
}