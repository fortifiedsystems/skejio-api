const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.tourdates.index);
router.get('/:id', authRequired, ctrl.tourdates.show);
router.post('/', authRequired, ctrl.tourdates.create);

module.exports = router;