const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.agencies.index);
router.get('/:id', authRequired, ctrl.agencies.show);
router.post('/', authRequired, ctrl.agencies.create);
router.put('/:id', authRequired, ctrl.agencies.update);
router.delete('/:id', authRequired, ctrl.agencies.delete);


module.exports = router;
