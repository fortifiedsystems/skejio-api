const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tourdate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourdate',
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 1,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;