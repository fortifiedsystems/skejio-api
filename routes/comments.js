const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const ctrl = require('../controllers');

// router.get('/', authRequired, ctrl.comments.index);
router.get('/:threadId', authRequired, ctrl.comments.show);
router.post('/', authRequired, ctrl.comments.create);
// router.put('/:id', authRequired, ctrl.comments.update);
router.delete('/:id', authRequired, ctrl.comments.destroy);

module.exports = router;