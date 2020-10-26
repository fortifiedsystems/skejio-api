const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.tourDate.index);
router.get('/shows/:tourId', ctrl.tourDate.tourIndex);
router.get('/:id', ctrl.tourDate.show);
router.post('/create/:tourId', ctrl.tourDate.create);
router.put('/:id', ctrl.tourDate.update);
router.delete('/:id', ctrl.tourDate.destroy);

module.exports = router;