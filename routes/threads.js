const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const ctrl = require('../controllers');

router.get('/', authRequired, ctrl.threads.index);
router.get('/:id', authRequired, ctrl.threads.show);
router.post('/', authRequired, ctrl.threads.create);
router.put('/:id', authRequired, ctrl.threads.update);
router.delete('/:id', authRequired, ctrl.threads.destroy);

module.exports = router;
