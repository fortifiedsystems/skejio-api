const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist' || 'Manager' || 'Teammate',
    },
    tourDate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourDate',
    },
    content: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;