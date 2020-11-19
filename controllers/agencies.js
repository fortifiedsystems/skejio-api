const db = require('../models');
const errors = require('../utils/errors');



const index = (req, res) => {
    db.Agency.find({}, (err, foundAgencies) => {
        if (err) console.log(`Error at Agency#index: ${err}`);
        if (!foundAgencies.length) return res.status(204).json({
            msg: errors.NULL_COMPANIES,
        });

        return res.status(200).json({
            agencies: foundAgencies,
        });
    });
}




const show = async (req, res) => {
    await db.Agency.findById(req.params.id)
        .populate({
            path: 'agents admin',
            populate: {
                path: 'artists teammates'
            }
        })
        .exec((err, foundAgency) => {
            if (err) console.log(`Error at Agency#show: ${err}`);
            if (!foundAgency) return res.status(404).json({
                msg: errors.NULL_COMPANY,
            });

            if (req.userId != foundAgency.admin._id) return res.status(403).json({
                msg: errors.CO_ACCESS_DENIED,
            })

            return res.status(200).json({
                agency: foundAgency,
            });
        });
}




const create = async (req, res) => {
    try {
        const user = await db.User.findById(req.userId);
        if (user.__t !== 'Agent') {
            return res.status(403).json({
                msg: errors.CANNOT_CREATE_COMPANY,
            });
        }

        req.body.admin = user._id;
        req.body.agents = [];
        req.body.agents.push(req.userId);

        db.Company.create(req.body, (err, newAgency) => {
            if (err) console.log(`Error at Agency#create: ${err}`);
            if (!newAgency) return res.status(400).json({
                msg: 'Bad Request. Try again.',
            });

            user.agency = newAgency._id;
            user.save();

            return res.status(201).json({
                newAgency: newAgency,
            });
        });
    } catch (error) {
        console.log(error);
    }
}




const update = async (req, res) => {
    try {
        await db.Agency.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, savedAgency) => {
                if (err) console.log(`Error at Agency#update: ${err}`);
                if (!savedAgency) return res.status(404).json({
                    msg: errors.CO_ACCESS_DENIED,
                })

                return res.status(201).json({
                    savedAgency: savedAgency,
                });
            });
    } catch (error) {
        console.log(error);
    }
}



const destroy = (req, res) => {
    db.Agency.findByIdAndDelete(req.params.id)
        .populate({
            path: 'managers'
        }).exec((err, deletedAgency) => {
            if (err) console.log('Error at Agency#delete');
            if (!deletedAgency) return res.status(404).json({
                msg: 'Cannot delete a company that does not exist.',
            })

            if (req.userId != deletedAgency.admin) return res.status(404).json({
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