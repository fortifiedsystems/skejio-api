const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.companies.index);
router.get('/:id', authRequired, ctrl.companies.show)
router.post('/', authRequired, ctrl.companies.create);
router.put('/:id', authRequired, ctrl.companies.update);
router.delete('/:id', authRequired, ctrl.companies.destroy);

module.exports = router;