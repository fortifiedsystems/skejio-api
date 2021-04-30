const db = require('../models');
const errors = require('../utils/errors');
const { canCreate, canEditOrDelete } = require('../utils/authorization');
const { getVenueById, attachVenueInfoToBody } = require('../utils/txm');
const {
    getTotalMoniesGenerated,
    getShowGross,
    getShowNet,
    getPotentialAttendance,
    getActualAttendance
} = require('../utils/reportHelpers');



/**
 * See note on tour index route. Same applies.
 * @param {*} req 
 * @param {*} res 
 */
const index = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);

        if (user.__t === 'Artist') {
            db.Tourdate.find({ artist: req.userId })
                .populate({
                    path: 'tour',
                }).sort({
                    date: 'asc',
                }).exec((err, foundTourdates) => {
                    if (err) console.log('Error at tourdates#index');
                    if (!foundTourdates.length) return res.status(404).json({
                        msg: 'No tourdates found',
                    });

                    return res.status(200).json({
                        foundTourdates: foundTourdates,
                    });
                });
        } else if (
            user.__t === 'Manager' ||
            user.__t === 'Agent' ||
            user.__t === 'Teammate'
        ) {
            if (!user.artists.includes(req.query.artist) || !user.isAdmin) return res.status(403).json({
                msg: errors.UNAUTHORIZED,
            });

            db.Tourdate.find(req.query)
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

            db.Tourdate.find(req.query)
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
        const tourdate = await db.Tourdate.findById(req.params.id);
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
        db.Tourdate.findById(req.params.id)
            .populate({
                path: 'threads',
                populate: {
                    path: 'comments author',
                }
            }).exec((err, foundTourdate) => {
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
 * NOTE: if an artist is creating the tour date, 
 * they do not need to send their id back with the 
 * request. Otherwise, an artist id must be provided.
 */
const create = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);
        const tour = await db.Tour.findById(req.body.tour);
        const venue = await getVenueById(req.body.venueId);
        const authorized = canCreate(req, user, 'Tourdate');

        if (!authorized) return res.status(403).json({
            msg: errors.UNAUTHORIZED,
        });

        attachVenueInfoToBody(req, venue);

        // NOTE: for other accounts, artist needs to be included in sent body.
        if (user.__t === 'Artist') {
            req.body.artist = req.userId;
        }

        db.Tourdate.create(req.body, (err, newTourdate) => {
            if (err) console.log('Error at tourdate#create:', err);
            if (!newTourdate) return res.status(400).json({
                msg: 'Bad request. Try again. :)',
            });

            user.tourdates.push(newTourdate._id);
            tour.tourdates.push(newTourdate._id);
            user.save();
            tour.save();

            return res.status(201).json({
                newTourdate: newTourdate,
            });
        });
    } catch (error) {
        console.log('ERROR:', error);
    }
}



// TODO: gotta check the shit out of this math cuz it is squirly af.
const fileReport = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);
        const tourdate = await db.Tourdate.findById(req.params.id);
        const artist = await db.Artist.findById(tourdate.artist);
        const authorized = canEditOrDelete(req, user, tourdate);
        req.body.tourdate = req.params.id;

        if (!authorized) return res.status(403).json({
            msg: errors.UNAUTHORIZED,
        });

        if (tourdate.reportFiled) return res.status(403).json({
            msg: errors.REPORT_ALREADY_FILED,
        })

        getTotalMoniesGenerated(req);
        getPotentialAttendance(req);
        getActualAttendance(req);
        getShowGross(req);
        getShowNet(req, artist);

        db.Report.create(req.body, (err, newReport) => {
            if (err) console.log('Error at tourdate#fileReport:', err);
            if (!newReport) return res.status(400).json({
                msg: 'Could not create the report. Try again.'
            });

            tourdate.report = newReport._id;
            tourdate.reportFiled = true;
            tourdate.save();

            return res.status(201).json({
                reportFiled: newReport,
            });
        });
    } catch (error) {
        console.log('ERROR:', error);
    }
}



const update = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);
        const tourdate = await db.Tourdate.findById(req.params.id);
        let authorized = canEditOrDelete(req, user, tourdate);

        if (!authorized) return res.status(403).json({
            msg: errors.UNAUTHORIZED,
        });

        db.Tourdate.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, savedTourdate) => {
                if (err) console.log('Error at tourdates#update', err);
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
    const tourdate = await db.Tourdate.findById(req.params.id);
    let authorized = canEditOrDelete(req, user, tourdate);

    if (!authorized) return res.status(403).json({
        msg: errors.UNAUTHORIZED,
    });

    db.Tourdate.findByIdAndDelete(req.params.id, async (err, deletedTourdate) => {
        if (err) console.log('Error at tourdates#delete');
        if (!deletedTourdate) return res.status(404).json({
            msg: 'Not found',
        });

        // NOTE when threads and todos CRUD is completed, 
        // make sure to delete all threads with
        // deletedTourdate._id as their tourdate.
        // remove this tour date from the tour it is a part of.
        const tour = await db.Tour.findById(deletedTourdate.tour);
        let index = tour.tourdates.indexOf(deletedTourdate._id);
        tour.tourdates.splice(index, 1);
        tour.save();

        const artist = await db.Artist.findById(deletedTourdate.artist);
        index = artist.tourdates.indexOf(deletedTourdate._id);
        artist.tourdates.splice(index, 1);
        artist.save();

        return res.status(200).json({
            deletedTourdate: deletedTourdate,
        });
    });
}



module.exports = {
    index,
    show,
    create,
    fileReport,
    update,
    destroy,
}
