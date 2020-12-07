const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.todos.index);
router.get('/:id', authRequired, ctrl.todos.show);
router.post('/', authRequired, ctrl.todos.create);
router.put('/:id', authRequired, ctrl.todos.update);
router.delete('/:id', authRequired, ctrl.todos.destroy);

module.exports = router;