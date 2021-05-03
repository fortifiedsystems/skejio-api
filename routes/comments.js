const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const ctrl = require('../controllers');

router.get('/', authRequired, ctrl.comments.index);
router.get('/:id', authRequired, ctrl.comments.show);
router.post('/', authRequired, ctrl.comments.create);
router.delete('/:id', authRequired, ctrl.comments.destroy);
router.put('/delete/:id', authRequired, ctrl.comments.markAsDeleted);

module.exports = router;