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
const create = (req, res) => {
    try {
        db.Todo.create(
            {
                ...req.body,
                user: req.userId,
                tourDate: req.params.dateId,
            },
            async (err, createdTodo) => {
                if (err) console.log('Error at todo#create:', err);

                const date = await db.TourDate.findById(req.params.dateId);
                const user = await db.User.findById(req.userId);

                date.todos.push(createdTodo);
                user.todos.push(createdTodo);

                date.save();
                user.save();

                res.status(200).json({
                    createdTodo: createdTodo,
                });
            });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
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
                'updatedTodo': updatedTodo,
            });
        });
}


// DELETE
const destroy = (req, res) => {
    try {
        db.Todo.findByIdAndDelete(req.params.id, async (err, deletedTodo) => {
            if (err) console.log('Error at todo#destroy:', err);
            if (!deletedTodo) res.status(200).json({
                message: 'Could not find this todo.',
            });

            const tourDate = await db.TourDate.findById(deletedTodo.tourDate);
            const user = await db.User.findById(req.userId);


            const tourDateIndex = tourDate.todos.indexOf(deletedTodo._id);
            const userIndex = user.todos.indexOf(deletedTodo._id);

            tourDate.todos.splice(tourDateIndex, 1);
            user.todos.splice(userIndex, 1);

            tourDate.save();
            user.save();

            res.status(200).json({
                deletedTodo: deletedTodo
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }

}


// Exports
module.exports = {
    index,
    create,
    show,
    update,
    destroy,
}