const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.tour.index);
router.get('/:id', ctrl.tour.show);
router.post('/', ctrl.tour.create);
router.put('/:id', ctrl.tour.update);
router.delete('/:id', ctrl.tour.destroy);

module.exports = router;