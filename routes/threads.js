const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.threads.index);
router.get('/:id', authRequired, ctrl.threads.show);
router.post('/create/:dateId', authRequired, ctrl.threads.create);
router.put('/:id', authRequired, ctrl.threads.update);
router.delete('/:id', authRequired, ctrl.threads.destroy);

module.exports = router;