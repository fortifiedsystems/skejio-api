const db = require('../models');

const index = (req, res) => {
    try {
        db.Todo.find({ user: req.userId })
            .sort({
                dueDate: 'asc',
            }).exec((err, foundTodos) => {
                if (err) console.log(err);
                if (!foundTodos) res.status(404).json({
                    msg: 'found no todos matching this query.'
                });

                res.status(200).json({
                    foundTodos: foundTodos,
                });
            });
    } catch (error) {
        console.log(error);
    }
}

const show = (req, res) => {
    try {
        db.Todo.findById(req.params.id, (err, foundTodo) => {
            if (err) console.log(err);
            if (!foundTodo) return res.status(404).json({
                msg: 'Todo with this id not found',
            });

            return res.status(200).json({
                foundTodo: foundTodo,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const create = (req, res) => {
    try {
        db.Todo.create(req.body, async (err, createdTodo) => {
            if (err) console.log(err);
            if (!createdTodo) return res.status(400).json({
                msg: 'Bad request. Try again.'
            });

            const user = await db.User.findById(req.body.user);
            const tourdate = await db.Tourdate.findById(req.body.tourdate);
            user.todos.push(createdTodo._id);
            tourdate.todos.push(createdTodo._id);

            user.save();
            tourdate.save();

            return res.status(201).json({
                createdTodo: createdTodo,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const update = (req, res) => {
    try {
        if (req.userId !== req.body.createdBy._id) return res.status(403).json({
            msg: 'You are not authorized to edit this todo item. Contact the author.'
        });

        db.Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTodo) => {
            if (err) console.log(err);
            if (!updatedTodo) return res.status(404).json({
                msg: 'Could not find this todo',
            });

            return res.status(200).json({
                updatedTodo: updatedTodo,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const destroy = (req, res) => {
    try {
        db.Todo.findByIdAndDelete(req.params.id, async (err, deletedTodo) => {
            if (err) console.log(err);
            if (!deletedTodo) return res.status(404).json({
                msg: 'Could not find todo.',
            });

            const user = await db.User.findById(deletedTodo.user);
            let index = user.todos.indexOf(deletedTodo._id);
            user.todos.splice(index, 1);
            user.save();

            const tourdate = await db.Tourdate.findById(deletedTodo.tourdate);
            index = tourdate.todos.indexOf(deletedTodo._id);
            tourdate.todos.splice(index, 1);
            tourdate.save();

            return res.status(200).json({
                deletedTodo: deletedTodo,
            })
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}