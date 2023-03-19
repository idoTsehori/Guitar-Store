const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const {
  getGuitars,
  getGuitarById,
  addGuitar,
  updateGuitar,
  removeGuitar,
  addGuitarMsg,
  removeGuitarMsg,
} = require('./guitar.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getGuitars)
router.get('/:id', getGuitarById)
router.post('/', requireAuth, requireAdmin, addGuitar)
router.put('/:id', requireAuth, requireAdmin, updateGuitar)
router.delete('/:id', requireAuth, requireAdmin, removeGuitar)
// router.post('/', addGuitar)
// router.put('/:id', updateGuitar)
// router.delete('/:id', removeGuitar)

// router.delete('/:id', requireAuth, removeGuitar)

router.post('/:id/msg', requireAuth, addGuitarMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeGuitarMsg)

module.exports = router
