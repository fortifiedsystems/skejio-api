const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const MW = require('../middleware').tours;
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.tours.index);
router.get('/:id', authRequired, ctrl.tours.show);
router.post('/', [authRequired, MW.canCreate], ctrl.tours.create);
router.put('/:id', authRequired, ctrl.tours.update);
router.delete('/:id', authRequired, ctrl.tours.destroy);

module.exports = router;