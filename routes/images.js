const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:id', ctrl.images.show);
router.post('/contract', ctrl.images.uploadContract);
// router.post('/poster', authRequired, ctrl.images.uploadPoster);

module.exports = router;