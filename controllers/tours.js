const db = require('../models');

const index = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);
        if (user.__t === 'Artist') {
            // when it comes time to add tourdates, populate this.
            db.Tour.find({ artist: req.userId }, (err, foundTours) => {
                if (err) console.log('Error at Tours#index');
                if (!foundTours.length) return res.status(404).json({
                    msg: 'Found no tours for this artist.',
                });

                return res.status(200).json({
                    tours: foundTours,
                })
            });
        } else if (user.__t === 'Manager' || user.__t === 'Agent') {
            return res.status(404).json({
                msg: 'Use show route',
            })
        }
    } catch (error) {
        console.log(error);
    }
}



/**
 * @NOTE For the front end: 
 * if the user is a manager or agent, form will need a drop down
 * populated with artists registered to that agent or manager.
 * if the user is an artist, form only need a name field.
 * if the user is a teammate, They shouldn't even be able 
 * to access the form.
 * 
 * if the account creating the tour is not connected to 
 * the artist in the request, they will not be allowed to create
 * the tour.
 * @param {*} req 
 * @param {*} res 
 */
const create = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);

        if (user.__t === 'Artist') {
            req.body.artist = req.userId;
        } else if (user.__t === 'Teammate') {
            return res.status(403).json({
                msg: 'Teammates cannot create tours.',
            })
        } else {
            if (!user.artists.includes(req.body.artist)) {
                return res.status(403).json({
                    msg: 'Not authorized to add tours for this artist.'
                });
            }
        }

        db.Tour.create(req.body, async (err, newTour) => {
            if (err) console.log(`Error at Tour#create ${err}`);
            if (!newTour) return res.status(400).json({
                msg: 'Bad request. Try again. :)',
            });

            if (user.__t === 'Artist') {
                user.tours.push(newTour._id);
                user.save();
            } else {
                const artist = await db.Artist.findById(req.body.artist);
                artist.tours.push(newTour._id);
                artist.save();
            }

            return res.status(201).json({
                newTour: newTour,
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