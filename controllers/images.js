
const db = require('../models');
const { cloudinary } = require('../utils/cloudinary');
const tourdates = require('../models/Tourdate');

const show = (req, res) => {
    try {
        db.Image.findById(req.params.id, (err, foundImage) => {
            if (err) console.log('THERE HAS BEEN AN ERROR:', err);
            if (!foundImage) return res.status(403).json({
                msg: 'Could not find this image'
            });

            return res.status(200).json({
                foundImage: foundImage
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const uploadContract = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'contracts'
        });

        const data = { contract: uploadedResponse.public_id }

        await db.Tourdate.findByIdAndUpdate(
            req.body.tourdate,
            data,
            { new: true },
            (err, updatedTourdate) => {
                if (err) console.log(err);
                if (!updatedTourdate) return res.status(404).json({
                    msg: 'Tourdate not found',
                });
                console.log(updatedTourdate);

                return res.status(200).json({
                    updatedTourdate: updatedTourdate,
                })
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'something went wrong' })
    }
}

module.exports = {
    show,
    uploadContract,
}