const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.merch.index);
router.get('/:id', ctrl.merch.show);
router.post('/', ctrl.merch.create);
router.put('/:id', ctrl.merch.update);
router.delete('/:id', ctrl.merch.destroy);

module.exports = router;