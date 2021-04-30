const db = require('../models');
const errors = require('../utils/errors');
const { getVenueById, attachVenueInfoToBody } = require('../utils/txm');

const create = async (req, res) => {
    const tourdate = await getVenueById(req.body.venueId);
    const rb = req.body;
    const {
        name,
        city,
        state,
        country,
        address,
        address2,
        postalCode,
        venueLink,
        locale,
        venueImage,
        timezone,
        capacity
    } = tourdate;

    rb.name = name;
    rb.city = city;
    rb.state = state;
    rb.country = country;
    rb.address = address;
    rb.address2 = address2 || null;
    rb.zip = postalCode;
    rb.venueLink = venueLink || null;
    rb.locale = locale || null;
    rb.venueImage = venueImage || null;
    rb.timezone = timezone || null;
    rb.capacity = capacity || null;

    try {
        db.Venue.create(rb, (err, newVenue) => {
            if (err) console.log('Error at venue#create:', err);
            if (!newVenue) return res.status(400).json({
                msg: 'Could not create a venue.'
            });

            // NOTE: Maybe add this in the second phase. 
            // A bit too complicated for the time being.
            // newVenue.tourdates.push(rb.tourdate);
            // newVenue.save();

            return res.status(201).json({
                msg: 'Successfully created venue.',
                newVenue: newVenue,
            });
        })
    } catch (error) {
        console.log(errors.TRY_AGAIN);
    }
}

module.exports = {
    create,
}