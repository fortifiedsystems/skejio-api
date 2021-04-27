const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.mgmt.index);
router.get('/:id', authRequired, ctrl.mgmt.show)
router.post('/', authRequired, ctrl.mgmt.create);
router.put('/:id', authRequired, ctrl.mgmt.update);
router.delete('/:id', authRequired, ctrl.mgmt.destroy);

module.exports = router;