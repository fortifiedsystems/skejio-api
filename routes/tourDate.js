const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:tourId', ctrl.tourDate.index);
router.get('/:tourId/:showId', ctrl.tourDate.show);
router.post('/:tourId', ctrl.tourDate.create);
router.put('/:tourId/:showId', ctrl.tourDate.update);
// router.delete('/:tourId/:showId', ctrl.tourDate.destroy);

module.exports = router;