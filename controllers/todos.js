const db = require('../models');



// GET index
const index = (req, res) => {
    // console.log('query', req.query);
    db.Todo.find(req.query, (err, foundTodos) => {
        if (err) console.log('Error at todo#index');
        if (!foundTodos) return res.status(404).json({
            message: 'There is nothing to do.'
        });

        for (let i = 0; i < foundTodos.length; i++) {
            foundTodos[i].dueDate = foundTodos[i].dueDate.toLocaleDateString("en-US");
            foundTodos[i].createdAt = foundTodos[i].createdAt.toLocaleDateString("en-US");
        }

        return res.status(200).json({
            todos: foundTodos,
        });
    });
}


// GET show 
const show = (req, res) => {
    db.Todo.findById(req.params.id, (err, foundTodo) => {
        if (err) console.log('Error at todo#show:', err);
        if (!foundTodo) return res.status(404).json({
            message: 'No todo with this id exists',
        });

        return res.status(200).json({
            todo: foundTodo,
        });
    });
}


// POST create
const create = (req, res) => {
    try {
        db.Todo.create(
            req.body,
            async (err, createdTodo) => {
                if (err) console.log('Error at todo#create:', err);

                const date = await db.TourDate.findById(req.body.tourDate);
                const user = await db.User.findById(req.body.user);

                date.todos.push(createdTodo);
                user.todos.push(createdTodo);

                date.save();
                user.save();

                return res.status(200).json({
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
    try {
        db.Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, updatedTodo) => {
                if (err) console.log('Error at todo#update:', err);
                if (!updatedTodo) return res.status(404).json({
                    'message': 'Cannot update todo that does not exist.',
                });

                res.status(200).json({
                    'updatedTodo': updatedTodo,
                });
            });
    } catch (error) {
        console.log(error);
    }

}


// DELETE
const destroy = (req, res) => {
    try {
        db.Todo.findByIdAndDelete(req.params.id, async (err, deletedTodo) => {
            if (err) console.log('Error at todo#destroy:', err);
            if (!deletedTodo) return res.status(404).json({
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