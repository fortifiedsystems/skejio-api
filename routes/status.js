const router = require('express').Router()
const { getStatus, get404 } = require('../controllers/server')

router.get('/', getStatus)
router.get('*', get404)

module.exports = router
