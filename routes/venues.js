const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.venues.index);
router.get('/:id', authRequired, ctrl.venues.show);
router.post('/', authRequired, ctrl.venues.create);

module.exports = router;