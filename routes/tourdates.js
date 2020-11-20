const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.tourdates.index);
router.post('/', authRequired, ctrl.tourdates.create);

module.exports = router;