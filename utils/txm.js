import axios from 'axios';

const TM_BASE_URL = process.env.TM_URL;
const TM_API_KEY = process.env.TM_API_KEY;


/**
 * @function getVenueById()
 * @description Retrieves venue information from 
 * TicketMaster api based on id sent from frontend.
 * @param {*} id venue id to search database for.
 * @returns venue object
 */
const getVenueById = async (id) => {
    const TM_GET_VENUE = `${TM_BASE_URL}/${id}.json?${TM_API_KEY}`;

    try {
        return await axios.get(TM_GET_VENUE, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getVenueById,
}
