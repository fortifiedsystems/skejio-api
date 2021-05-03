const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const isAuthor = require('../middleware/isAuthor');
const ctrl = require('../controllers');

const middleWare = [authRequired, isAuthor];

router.get('/', authRequired, ctrl.comments.index);
router.get('/:id', authRequired, ctrl.comments.show);
router.post('/', authRequired, ctrl.comments.create);
router.delete('/:id', authRequired, ctrl.comments.destroy);
router.put('/delete/:id', middleWare, ctrl.comments.markAsDeleted);

module.exports = router;