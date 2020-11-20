const db = require('../models');
const errors = require('../utils/errors');
const { checkPrivilage, adjustParams } = require('../utils/utilities');


const index = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);

        if (user.__t === 'Artist') {
            db.TourDate.find({ artist: req.userId })
                .populate({
                    path: 'tour',
                }).exec((err, foundTourdates) => {
                    if (err) console.log('Error at tourdates#index');
                    if (!foundTourdates.length) return res.status(404).json({
                        msg: 'No tourdates found',
                    });

                    return res.status(200).json({
                        foundTourdates: foundTourdates,
                    });
                });
        } else if (user.__t === 'Manager' || user.__t === 'Agent') {
            if (!user.artists.includes(req.query.artist)) return res.status(403).json({
                msg: errors.UNAUTHORIZED,
            });

            db.TourDate.find(req.query)
                .populate({
                    path: 'tour'
                }).exec((err, foundTourdates) => {
                    if (err) console.log('Error at tourdates#index');
                    if (!foundTourdates) return res.status(404).json({
                        msg: 'No tourdates found',
                    });

                    return res.status(200).json({
                        foundTourdates: foundTourdates,
                    })
                });
        } else {
            let authorized = false;
            let artist = await db.User.findById(req.query.artist);
            if (user.manager) {
                if (user.manager.equals(artist.manager)) {
                    authorized = true;
                }
            } else if (user.agent) {
                if (user.agent.equals(artist.agent)) {
                    authorized = true;
                }
            }

            if (!authorized) return res.status(403).json({
                msg: errors.UNAUTHORIZED,
            })

            db.TourDate.find(req.query)
                .populate({
                    path: 'tour'
                }).exec((err, foundTourdates) => {
                    if (err) console.log('Error at tourdates#index');
                    if (!foundTourdates) return res.status(404).json({
                        msg: 'No Tourdates found.'
                    });

                    return res.status(200).json({
                        foundTourdates: foundTourdates,
                    });
                });
        }
    } catch (error) {
        console.log(error);
    }

}

/**
 * NOTE: if an artist is creating the tour date, they do not need to send their id back with the request
 * otherwise, an artist id must be provided.
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);
        const tour = await db.Tour.findById(req.body.tour);
        let artist;
        let authorized = false;

        if (user.__t === 'Artist') {
            authorized = true;
        } else {
            artist = await db.User.findById(req.body.artist);

            if (user.__t === 'Teammate') {
                if (user.manager) {
                    if (user.manager.equals(artist.manager)) {
                        authorized = true;
                    }
                } else if (user.agent) {
                    if (user.agent.equals(artist.agent)) {
                        authorized = true;
                    }
                }
            } else {
                if (user.artists.includes(artist._id)) {
                    authorized = true;
                }
            }
        }

        if (!authorized) return res.status(403).json({
            msg: errors.UNAUTHORIZED,
        });

        // NOTE: for other accounts, artist will be included in sent body.
        if (user.__t === 'Artist') {
            req.body.artist = req.userId;
        }

        db.TourDate.create(req.body, (err, newTourdate) => {
            if (err) console.log('Error at tourdate#create');
            if (!newTourdate) return res.status(400).json({
                msg: 'Bad request. Try again. :)',
            });

            tour.tourdates.push(newTourdate._id);
            tour.save();

            return res.status(201).json({
                newTourdate: newTourdate,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    index,
    create,
}
