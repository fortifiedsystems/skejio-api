const db = require('../models');
const errors = require('../utils/errors');

const canViewTours = async (req, res, next) => {
    const user = await db.User.findById(req.userId);
    if (user.__t !== 'Artist') {
        if (!user.artists.includes(req.userId)) {
            return res.status(403).json({
                msg: errors.UNAUTHORIZED,
            })
        }
    }
}



const canCreate = async (req, res, next) => {
    const user = await db.User.findById(req.userId);
    if (user.__t != 'Artist') {
        if (!user.isAdmin ||
            !user.artists.includes(req.body.artist)
        ) {
            return res.status(403).json({
                msg: errors.UNAUTHORIZED
            });
        }
    } else {
        if (user._id != req.body.artist) {
            return res.status(403).json({
                msg: errors.UNAUTHORIZED
            });
        }
    }

    next();
}

module.exports = {
    canCreate,
}