const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const ctrl = require('../controllers');

router.post('/', authRequired, ctrl.notifications.create);

module.exports = router;