const db = require('../models');
const errors = require('../utils/errors');



const index = (req, res) => {
    db.Company.find({}, (err, foundCompanies) => {
        if (err) console.log(`Error at Company#index: ${err}`);
        if (!foundCompanies.length) return res.status(204).json({
            msg: errors.NULL_COMPANIES,
        });

        return res.status(200).json({
            companies: foundCompanies,
        });
    });
}




const show = async (req, res) => {
    await db.Company.findById(req.params.id)
        .populate({
            path: 'managers admin',
            populate: {
                path: 'artists teammates'
            }
        })
        .exec((err, foundCompany) => {
            if (err) console.log(`Error at Company#show: ${err}`);
            if (!foundCompany) return res.status(404).json({
                msg: errors.NULL_COMPANY,
            });

            if (req.userId != foundCompany.admin._id) return res.status(403).json({
                msg: errors.CO_ACCESS_DENIED,
            })

            return res.status(200).json({
                company: foundCompany,
            });
        });
}




const create = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);
        if (user.__t !== 'Manager') {
            return res.status(403).json({
                msg: errors.CANNOT_CREATE_COMPANY,
            });
        }

        req.body.admin = user._id;
        req.body.managers = [];
        req.body.managers.push(req.userId);

        db.Mgmt.create(req.body, (err, newMgmt) => {
            if (err) console.log(`Error at Mgmt#create: ${err}`);
            if (!newMgmt) return res.status(400).json({
                msg: 'Bad Request. Try again.',
            });

            user.company = newMgmt._id;
            user.save();

            return res.status(201).json({
                newMgmt: newMgmt,
            });
        });
    } catch (error) {
        console.log(error);
    }
}




const update = async (req, res) => {
    try {
        await db.Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, savedCompany) => {
                if (err) console.log(`Error at Company#update: ${err}`);
                if (!savedCompany) return res.status(404).json({
                    msg: errors.CO_ACCESS_DENIED,
                })

                return res.status(201).json({
                    updatedCompany: savedCompany,
                });
            });
    } catch (error) {
        console.log(error);
    }
}



const destroy = (req, res) => {
    db.Company.findByIdAndDelete(req.params.id)
        .populate({
            path: 'managers'
        }).exec((err, deletedCompany) => {
            if (err) console.log('Error at Company#delete');
            if (!deletedCompany) return res.status(404).json({
                msg: 'Cannot delete a company that does not exist.',
            })

            if (req.userId != deletedCompany.admin) return res.status(404).json({
                msg: 'Cannot delete this company',
            });

            return res.status(201).json({
                deletedCompany: deletedCompany,
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