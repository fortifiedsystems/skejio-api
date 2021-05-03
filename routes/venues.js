const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.venues.index);
router.get('/:id', ctrl.venues.show);
router.post('/', ctrl.venues.create);

module.exports = router;