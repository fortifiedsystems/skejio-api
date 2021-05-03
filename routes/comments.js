const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const mw = require('../middleware').comments;
const ctrl = require('../controllers');


router.get('/', authRequired, ctrl.comments.index);
router.get('/:id', authRequired, ctrl.comments.show);
router.post('/', [authRequired, mw.canCreateComment], ctrl.comments.create);
router.delete('/:id', [authRequired, mw.isAuthor], ctrl.comments.destroy);
router.put('/delete/:id', [authRequired, mw.isAuthor], ctrl.comments.markAsDeleted);

module.exports = router;