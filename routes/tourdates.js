const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.tourdates.index);
router.get('/all-managed-tourdates', ctrl.tourdates.getAllManagedTourdates);
router.get('/:id', ctrl.tourdates.show);
router.post('/', ctrl.tourdates.create);
router.post('/report/:id', ctrl.tourdates.fileReport);
router.put('/:id', ctrl.tourdates.update);
router.delete('/:id', ctrl.tourdates.destroy);

module.exports = router;