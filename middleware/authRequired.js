const jwt = require('jsonwebtoken');
const UNAUTHORIZED = 'You are not authorized to take this action.';

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, "super_secret_key", function (err, payload) {
            if (err) return res.status(500).json({
                message: UNAUTHORIZED
            });
            req.userId = payload._id;
            req.userType = payload.userType;
            next();
        });
    } else {
        res.sendStatus(403);
    }
};