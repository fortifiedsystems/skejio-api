const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const ctrl = require('../controllers');

router.get('/', authRequired, ctrl.notifications.index);
router.get('/:id', authRequired, ctrl.notifications.show);
router.post('/', authRequired, ctrl.notifications.create);
router.put('/:id', authRequired, ctrl.notifications.update);

module.exports = router;