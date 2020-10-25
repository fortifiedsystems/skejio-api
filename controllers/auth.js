const bcrypt = require('bcryptjs');
const db = require('../models');
// const jwt = require('jsonwebtoken');

// POST Register Route
const register = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (foundUser) {
            return res.send({
                message: 'Account is already registered',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const account;

        if (req.body.accountType === 'Artist') {
            account = db.Artist;
        } else if (req.body.accountType === 'Manager') {
            account = db.Manager;
        } else if (req.body.accountType === 'Teammate') {
            account = db.Teammate;
        }

        const createdUser = await account.create({ ...req.body, password: hash });

        return res
            .status(201)
            .json({ status: 201, message: 'success', createdUser });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again.',
        });
    }
}

module.exports = {
    register,
}