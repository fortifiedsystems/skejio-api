const db = require('../models');

// GET show 
const show = (req, res) => {
    db.Todo.findById(req.params.id, (err, foundTodo) => {
        if (err) console.log('Error at todo#show:', err);
        if (!foundTodo) res.status(200).json({
            'message': 'No todo with this id exists',
        });

        res.status(200).json({
            'todo': foundTodo,
        })
    })
}


// POST create
const create = (req, res) => {
    db.Todo.create(req.body, (err, createdTodo) => {
        if (err) console.log('Error at todo#create:', err);

        res.status(200).json({
            'todo': createdTodo,
        });
    })
}

module.exports = {
    create,
    show,
}