const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/', ctrl.invites.create);
router.put('/:id/accept', ctrl.invites.acceptInvite);
router.put('/:id/reject', ctrl.invites.rejectInvite);

module.exports = router;