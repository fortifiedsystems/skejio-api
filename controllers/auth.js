// External Modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Internal Modules
const db = require('../models');
const errors = require('../utils/errors');



// POST register
const register = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (foundUser) {
            return res.send({
                message: errors.UNIQUE_ERR,
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
        } else if (req.body.accountType === 'Agent') {
            account = db.Agent;
        } else if (req.body.accountType === 'Teammate') {
            account = db.Teammate;
        }

        const createdUser = await account.create({ ...req.body, password: hash });

        if (createdUser.__t === 'Teammate') {
            if (createdUser.manager) {
                const superior = await db.User.findById(createdUser.manager);
                if (superior.__t === 'Artist') {
                    return res.status(403).json({
                        msg: 'Captain must be an agent or Manager',
                    });
                } else {
                    superior.teammates.push(createdUser._id);
                    superior.save();
                }
            } else if (createdUser.agent) {
                const superior = await db.User.findById(createdUser.agent);
                if (superior.__t === 'Artist') {
                    return res.status(403).json({
                        msg: 'Captain must be an agent or manager',
                    });
                } else {
                    superior.teammates.push(createdUser._id);
                    superior.save();
                }
            }
        }

        if (createdUser.__t === 'Artist') {
            let superior;
            if (createdUser.manager) {
                superior = await db.User.findById(createdUser.manager);
                if (superior.__t !== 'Manager') {
                    return res.status(403).json({
                        msg: 'Your manager must be signed up as a manager on Skej.io.',
                    })
                } else {
                    superior.teammates.push(createdUser._id);
                    superior.save();
                }
            }

            if (createdUser.agent) {
                superior = await db.User.findById(createdUser.agent);
                if (superior.__t !== 'Agent') {
                    return res.status(403).json({
                        msg: 'Your Agent must be signed up as an agent on Skej.io',
                    })
                } else {
                    superior.teammates.push(createdUser._id);
                    superior.save();
                }
            }
        }

        return res.status(201).json({
            status: 201,
            message: 'Successfully created new account.',
            createdUser
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: `${errors.TRY_AGAIN}: ${err}`,
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
            );

            return await res.status(200).json({
                status: 200,
                message: 'Successfully logged in.',
                id: foundUser._id,
                signedJwt,
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: errors.INVALID_LOGIN,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: errors.TRY_AGAIN,
        });
    }
}



// Exports
module.exports = {
    register,
    login,
}