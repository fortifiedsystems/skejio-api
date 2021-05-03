const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const MW = require('../middleware').comments;
const ctrl = require('../controllers');


router.get('/', authRequired, ctrl.comments.index);
router.get('/:id', authRequired, ctrl.comments.show);
router.post('/', [authRequired, MW.canCreateComment], ctrl.comments.create);
router.put('/:id', [authRequired, MW.isAuthor], ctrl.comments.edit);
router.delete('/:id', [authRequired, MW.isAuthor], ctrl.comments.destroy);
router.put('/delete/:id', [authRequired, MW.isAuthor], ctrl.comments.markAsDeleted);

module.exports = router;