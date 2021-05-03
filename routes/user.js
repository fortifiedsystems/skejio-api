const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/search', ctrl.user.index);
router.get('/', ctrl.user.show);
router.put('/', ctrl.user.update);
router.delete('/', ctrl.user.destroy);

module.exports = router;