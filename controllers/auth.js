// External Modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Internal Modules
const db = require('../models');
const errors = require('../utils/errors');



// ANCHOR POST register
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

        // TEAMMATE ACCOUNT VALIDATION.
        if (createdUser.accountType === 'Teammate') {
            if (createdUser.manager) {
                const superior = await db.User.findById(createdUser.manager);

                if (superior.accountType === 'Artist') {
                    return res.status(403).json({
                        msg: 'Captain must be an agent or Manager',
                    });
                } else {
                    superior.teammates.push(createdUser._id);
                    superior.save();
                }
            } else if (createdUser.agent) {
                const superior = await db.User.findById(createdUser.agent);
                if (superior.accountType === 'Artist') {
                    return res.status(403).json({
                        msg: 'Captain must be an agent or manager',
                    });
                } else {
                    superior.teammates.push(createdUser._id);
                    superior.save();
                }
            }
        }

        // ARTIST ACCOUNT VALIDATION
        if (createdUser.accountType === 'Artist') {
            if (createdUser.manager) {
                const manager = await db.User.findById(createdUser.manager);
                if (manager.accountType !== 'Manager') {
                    return res.status(403).json({
                        msg: 'Your manager must be signed up as a manager on Skej.io.',
                    })
                } else {
                    manager.artists.push(createdUser._id);
                    manager.save();
                }
            }

            if (createdUser.agent) {
                const agent = await db.User.findById(createdUser.agent);
                if (agent.accountType !== 'Agent') {
                    return res.status(403).json({
                        msg: 'Your Agent must be signed up as an agent on Skej.io',
                    })
                } else {
                    agent.artists.push(createdUser._id);
                    agent.save();
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





// ANCHOR POST login
const login = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        if (!foundUser) return res.send({ message: 'INVALID LOGIN' });

        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) return res.send({ message: 'INVALID LOGIN' });

        if (match) {
            const signedJwt = jwt.sign(
                {
                    _id: foundUser._id,
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
            message: errors.TRY_AGAIN + error,
        });
    }
}



// Exports
module.exports = {
    register,
    login,
}