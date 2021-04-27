const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/:id', authRequired, ctrl.images.show);
router.post('/contract', authRequired, ctrl.images.uploadContract);
// router.post('/poster', authRequired, ctrl.images.uploadPoster);

module.exports = router;