const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const ctrl = require('../controllers');

router.get('/', ctrl.threads.index);
router.get('/:id', ctrl.threads.show);
router.post('/', ctrl.threads.create);
router.put('/:id', ctrl.threads.update);
router.delete('/:id', ctrl.threads.destroy);

module.exports = router;
