const db = require('../models');

const create = (req, res) => {
    try {
        console.log('tried!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create,
}