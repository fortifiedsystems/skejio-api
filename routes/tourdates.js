const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.tourdates.index);
router.get('/:id', authRequired, ctrl.tourdates.show);
router.post('/', authRequired, ctrl.tourdates.create);
router.put('/:id', authRequired, ctrl.tourdates.update);
router.delete('/:id', authRequired, ctrl.tourdates.destroy);

module.exports = router;