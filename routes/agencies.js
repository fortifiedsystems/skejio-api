const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


/**
 * There are two delete routes. A true delete route (/:id)
 * and a fake delete route that just marks the delete Flag
 * in the agency model as true.
 */
router.get('/', ctrl.agencies.index);
router.get('/:id', ctrl.agencies.show);
router.post('/', ctrl.agencies.create);
router.put('/:id', ctrl.agencies.update);
router.delete('/:id', ctrl.agencies.destroy);
router.put('/delete/:id', ctrl.agencies.markAsDeleted);


module.exports = router;
