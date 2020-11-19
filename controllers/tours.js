const db = require('../models');

const create = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);
        if (user.__t === 'Artist') {
            req.body.artist = req.userId;
        } else if (user.__t === 'Teammate') {
            return res.status(403).json({
                msg: 'Teammates cannot create tours.',
            })
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
    create,
}