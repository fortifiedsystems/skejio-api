const db = require('../models');
const errors = require('../utils/errors');
const { checkPrivilage, adjustParams } = require('../utils/utilities');

/**
 * See note on tour index route. Same applies.
 * @param {*} req 
 * @param {*} res 
 */
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





const show = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);
        const tourdate = await db.TourDate.findById(req.params.id);
        let authorized = false;


        // Authorize account to view this tourdate.
        if (user.__t === 'Artist') {
            if (tourdate.artist.equals(user._id)) {
                authorized = true;
            }
        } else if (user.__t === 'Teammate') {
            let artist = await db.User.findById(tourdate.artist);

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
            if (user.artists.includes(tourdate.artist)) {
                authorized = true;
            }
        }

        if (!authorized) return res.status(403).json({
            msg: errors.UNAUTHORIZED,
        });


        // pull back tourdate.
        db.TourDate.findById(req.params.id, (err, foundTourdate) => {
            if (err) console.log('Error tourdates#show');
            if (!foundTourdate) return res.status(404).json({
                msg: 'Not found',
            });

            return res.status(200).json({
                foundTourdate: foundTourdate,
            });
        });
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




const update = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);
        const tourdate = await db.TourDate.findById(req.params.id);
        let authorized = false;

        if (user.__t === 'Artist') {
            if (tourdate.artist.equals(user._id)) {
                authorized = true;
            }
        } else {
            let artist = await db.User.findById(tourdate.artist);

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

        db.TourDate.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, savedTourdate) => {
                if (err) console.log('Error at tourdates#update');
                if (!savedTourdate) return res.status(404).json({
                    msg: 'Not found.',
                });

                return res.status(200).json({
                    savedTourdate: savedTourdate,
                })
            });
    } catch (error) {
        console.log(error);
    }
}




const destroy = async (req, res) => {
    const user = await db.User.findById(req.userId);
    const tourdate = await db.TourDate.findById(req.params.id);
    let authorized = false;

    if (user.__t === 'Artist') {
        if (tourdate.artist.equals(user._id)) {
            authorized = true;
        }
    } else {
        let artist = await db.User.findById(tourdate.artist);

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

    db.TourDate.findByIdAndDelete(req.params.id, async (err, deletedTourdate) => {
        if (err) console.log('Error at tourdates#delete');
        if (!deletedTourdate) return res.status(404).json({
            msg: 'Not found',
        });

        // NOTE when threads and todos CRUD is completed, 
        // make sure to delete all threads with
        // deletedTourdate._id as their tourdate.
        // remove this tour date from the tour it is a part of.
        const tour = await db.Tour.findById(deletedTourdate.tour);
        const index = tour.tourDates.indexOf(deletedTourdate._id);
        tour.tourDates.splice(index, 1);
        tour.save();

        return res.status(200).json({
            deletedTourdate: deletedTourdate,
        });
    });
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}
