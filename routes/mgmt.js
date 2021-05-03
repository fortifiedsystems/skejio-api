const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.mgmt.index);
router.get('/:id', ctrl.mgmt.show)
router.post('/', ctrl.mgmt.create);
router.put('/:id', ctrl.mgmt.update);
router.delete('/:id', ctrl.mgmt.destroy);

module.exports = router;