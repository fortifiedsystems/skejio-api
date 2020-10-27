const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.tourDate.index);
router.get('/shows/:tourId', authRequired, ctrl.tourDate.tourIndex);
router.get('/:id', authRequired, ctrl.tourDate.show);
router.post('/create/:tourId', authRequired, ctrl.tourDate.create);
router.put('/:id', authRequired, ctrl.tourDate.update);
router.delete('/:id', authRequired, ctrl.tourDate.destroy);

module.exports = router;