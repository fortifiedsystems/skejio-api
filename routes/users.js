const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.users.show);
router.put('/:id', authRequired, ctrl.users.update);
router.delete('/:id', authRequired, ctrl.users.destroy);

module.exports = router;