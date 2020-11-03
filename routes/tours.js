const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', ctrl.tours.index);
router.get('/:id', ctrl.tours.show);
router.post('/create/:artistId', ctrl.tours.create);
router.put('/:id', ctrl.tours.update);
router.delete('/:id', ctrl.tours.destroy);

module.exports = router;