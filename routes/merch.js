const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');


router.post('/', authRequired, ctrl.merch.create);
// router.post('/poster', authRequired, ctrl.images.uploadPoster);

module.exports = router;