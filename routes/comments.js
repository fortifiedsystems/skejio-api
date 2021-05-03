const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


router.get('/', ctrl.comments.index);
router.get('/:id', ctrl.comments.show);
router.post('/', ctrl.comments.create);
router.put('/:id', ctrl.comments.edit);
router.delete('/:id', ctrl.comments.destroy);
router.put('/delete/:id', ctrl.comments.markAsDeleted);

module.exports = router;