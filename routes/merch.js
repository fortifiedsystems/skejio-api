const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.merch.index);
router.get('/:id', authRequired, ctrl.merch.show);
router.post('/', authRequired, ctrl.merch.create);

module.exports = router;