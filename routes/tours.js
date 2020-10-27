const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.tours.index);
router.get('/artist/:artistId', ctrl.tours.artistTourIndex);
router.get('/:id', ctrl.tours.show);
router.post('/', ctrl.tours.create);
router.put('/:id', ctrl.tours.update);
router.delete('/:id', ctrl.tours.destroy);

module.exports = router;