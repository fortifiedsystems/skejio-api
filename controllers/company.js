const db = require('../models');
const err = require('../utils/errors');



const index = (req, res) => {
    db.Company.find({}, (err, foundCompanies) => {
        if (err) console.log(`Error at Company#index: ${err}`);
        if (!foundCompanies.length) return res.status(204).json({
            msg: err.NULL_COMPANIES,
        });

        return res.status(200).json({
            companies: foundCompanies,
        });
    });
}




const show = (req, res) => {
    db.Company.findById(req.params.id, (err, foundCompany) => {
        if (err) console.log(`Error at Company#show: ${err}`);
        if (!foundCompany) return res.status(404).json({
            msg: err.NULL_COMPANY,
        });

        return res.status(200).json({
            company: foundCompany,
        });
    });
}




const create = async (req, res) => {
    try {
        const user = await db.User.findById(req.id);
        if (user._t !== 'Manager') {
            return res.status(403).json({
                msg: err.CANNOT_CREATE_COMPANY,
            });
        }

        req.body.admin = user._id;

        db.Company.create(req.body, (err, newCompany) => {
            if (err) console.log(`Error at Company#create: ${err}`);
            if (!newCompany) return res.status(400).json({
                msg: 'Bad Request. Try again.',
            });

            return res.status(201).json({
                newCompany: newCompany,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    index,
    show,
    create,
}