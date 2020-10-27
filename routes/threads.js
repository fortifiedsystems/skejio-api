const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.threads.index);
router.get('/thread/:dateId', ctrl.threads.dateIndex);
router.get('/:id', ctrl.threads.show);
router.post('/create/:dateId', ctrl.threads.create);
router.put('/:id', ctrl.threads.update);
// router.delete('/:id', ctrl.threads.destroy);

module.exports = router;