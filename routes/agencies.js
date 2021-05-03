const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');


/**
 * There are two delete routes. A true delete route (/:id)
 * and a fake delete route that just marks the delete Flag
 * in the agency model as true.
 */
router.get('/', authRequired, ctrl.agencies.index);
router.get('/:id', authRequired, ctrl.agencies.show);
router.post('/', authRequired, ctrl.agencies.create);
router.put('/:id', authRequired, ctrl.agencies.update);
router.delete('/:id', authRequired, ctrl.agencies.destroy);
router.put('/delete/:id', authRequired, ctrl.agencies.markAsDeleted);


module.exports = router;
