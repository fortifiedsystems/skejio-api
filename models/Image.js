const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: String,
    desc: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: 'Tour',
        default: null,
    },
    tourdate: {
        type: Schema.Types.ObjectId,
        ref: 'Tourdate',
        default: null,
    },
    img: {
        data: Buffer,
        contentType: String,
    },
});

const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;