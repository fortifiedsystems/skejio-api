const jwt = require('jsonwebtoken');
const UNAUTHORIZED = 'You are not authorized to take this action.';

module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if ('undefined' !== typeof bearerHeader) {
        const token = bearerHeader.split(' ')[1];

        jwt.verify(token, "super_secret_key", function (err, payload) {
            if (err) return res.status(500).json({
                message: UNAUTHORIZED
            });
            req.userId = payload._id;
            next();
        });
    } else {
        res.sendStatus(403);
    }
};