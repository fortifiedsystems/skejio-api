const db = require('../models');


// GET index
const index = (req, res) => {
    db.Todo.find(req.query, (err, foundTodos) => {
        if (err) console.log('Error at todo#index');
        if (!foundTodos.length) res.status(200).json({
            'message': 'There is nothing to do.'
        });

        res.status(200).json({
            'todos': foundTodos,
        });
    });
}


// GET show 
const show = (req, res) => {
    db.Todo.findById(req.params.id, (err, foundTodo) => {
        if (err) console.log('Error at todo#show:', err);
        if (!foundTodo) res.status(200).json({
            'message': 'No todo with this id exists',
        });

        res.status(200).json({
            'todo': foundTodo,
        });
    });
}


// POST create
const create = async (req, res) => {
    try {
        const tourDate = await db.TourDate.findById(req.params.dateId);
        const body = {
            ...req.body,
            user: req.userId,
            tourDate: req.params.dateId,
        }

        db.Todo.create(body, (err, createdTodo) => {
            if (err) console.log('Error at todo#create:', err);
            tourDate.todos.push(createdTodo);
            tourDate.save();

            res.status(200).json({
                'todo': createdTodo,
            });
        });
    } catch (error) {
        return res.send(error);
    }

}


// PUT update
const update = (req, res) => {
    db.Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedTodo) => {
            if (err) console.log('Error at todo#update:', err);
            if (!updatedTodo) res.status(200).json({
                'message': 'Cannot update todo that does not exist.',
            });

            res.status(200).json({
                'todo': updatedTodo,
            });
        });
}


// DELETE
const destroy = (req, res) => {
    db.Todo.findByIdAndDelete(req.params.id, (err, deletedTodo) => {
        if (err) console.log('Error at todo#destroy:', err);
        if (!deletedTodo) res.status(200).json({
            'message': 'Cannot delete an item that does not exist.',
        });

        res.status(200).json({
            'todo': deletedTodo
        });
    });
}


// Exports
module.exports = {
    index,
    create,
    show,
    update,
    destroy,
}