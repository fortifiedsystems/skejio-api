const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/search', authRequired, ctrl.user.index);
router.get('/', authRequired, ctrl.user.show);
router.put('/', authRequired, ctrl.user.update);
router.delete('/', authRequired, ctrl.user.destroy);

module.exports = router;