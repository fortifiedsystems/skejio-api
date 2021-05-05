const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/search', ctrl.user.index);
router.get('/', ctrl.user.show);
router.put('/:id', ctrl.user.update);
router.put('/:id/addManager', ctrl.user.addManager);
router.put('/:id/addAgent', ctrl.user.addAgent);
router.delete('/', ctrl.user.destroy);

module.exports = router;