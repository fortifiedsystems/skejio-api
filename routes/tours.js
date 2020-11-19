const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.post('/', authRequired, ctrl.tours.create);

module.exports = router;