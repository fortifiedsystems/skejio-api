const { ARTISTS_ONLY } = require('../utils/errors');

module.exports = async (req, res, next) => {
    if (req.userType != 'Artist')
        return res.status(403).json({
            msg: ARTISTS_ONLY
        });
}