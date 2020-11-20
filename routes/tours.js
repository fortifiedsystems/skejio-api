const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.tours.index);
router.get('/:id', authRequired, ctrl.tours.show);
router.post('/', authRequired, ctrl.tours.create);
router.put('/:id', authRequired, ctrl.tours.update);

module.exports = router;