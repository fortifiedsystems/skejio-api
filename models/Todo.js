const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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