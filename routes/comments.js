const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.comments.index);
router.get('/thread/:threadId', ctrl.comments.threadIndex);
// router.get('/:id', ctrl.comments.show);
router.post('/create/:threadId', ctrl.comments.create);
// router.put('/:id', ctrl.comments.update);
// router.delete('/:id', ctrl.comments.destroy);

module.exports = router;