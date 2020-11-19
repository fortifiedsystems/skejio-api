const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.company.index);
router.get('/:id', authRequired, ctrl.company.show)
router.put('/', authRequired, ctrl.company.create);
// router.delete('/', authRequired, ctrl.user.destroy);

module.exports = router;