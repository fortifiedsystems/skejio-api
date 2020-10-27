const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// router.get('/', ctrl.todos.index);
// router.get('/user/:userId', ctrl.todos.userTodoIndex);
router.get('/:id', ctrl.todos.show);
router.post('/', ctrl.todos.create);
router.put('/:id', ctrl.todos.update);
// router.delete('/:id', ctrl.todos.destroy);

module.exports = router;