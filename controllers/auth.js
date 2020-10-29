// External Modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Internal Modules
const db = require('../models');

// Constants
const UNIQUE_ERR = 'Account with this email or username is already registered.'
const INVALID_LOGIN = 'Email or password is incorrect';
const TRY_AGAIN = 'Something went wrong. Please try again.';



// POST register
const register = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (foundUser) {
            return res.send({
                message: UNIQUE_ERR,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        let account;

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
            message: `${TRY_AGAIN}: ${err}`,
        });
    }
}




// POST login
const login = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        if (!foundUser) return res.send({ message: INVALID_LOGIN });

        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) return res.send({ message: INVALID_LOGIN });

        if (match) {
            const signedJwt = jwt.sign(
                {
                    _id: foundUser._id,
                    userType: foundUser.type,
                },
                "super_secret_key",
                {
                    expiresIn: '24h',
                }
            )

            return res.status(200).json({
                status: 200,
                message: 'Successfully logged in.',
                id: foundUser._id,
                signedJwt,
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: INVALID_LOGIN,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again",
        });
    }
}



// Exports
module.exports = {
    register,
    login,
}