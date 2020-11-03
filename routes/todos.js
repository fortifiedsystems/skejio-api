const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', ctrl.todos.index);
router.get('/:id', authRequired, ctrl.todos.show);
router.post('/create', authRequired, ctrl.todos.create);
router.put('/:id', ctrl.todos.update);
router.delete('/:id', authRequired, ctrl.todos.destroy);

module.exports = router;