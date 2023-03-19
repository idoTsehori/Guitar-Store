const guitarService = require('./guitar.service.js')

const logger = require('../../services/logger.service')

async function getGuitars(req, res) {
  try {
    const filterBy = {
      name: req.query.filterBy?.name || '',
      inStock: req.query.filterBy?.inStock || true,
      sortBy: req.query.sortBy?.by || 'all',
    }
    logger.debug('Getting guitars', filterBy)
    const guitars = await guitarService.query(filterBy)
    res.json(guitars)
  } catch (err) {
    logger.error('Failed to get guitars', err)
    res.status(500).send({ err: 'Failed to get guitars' })
  }
}

async function getGuitarById(req, res) {
  try {
    const guitarId = req.params.id
    const guitar = await guitarService.getById(guitarId)
    res.json(guitar)
  } catch (err) {
    logger.error('Failed to get guitar', err)
    res.status(500).send({ err: 'Failed to get guitar' })
  }
}

async function addGuitar(req, res) {
  const { loggedinUser } = req

  try {
    const guitar = req.body
    guitar.owner = loggedinUser
    const addedGuitar = await guitarService.add(guitar)
    res.json(addedGuitar)
  } catch (err) {
    logger.error('Failed to add guitar', err)
    res.status(500).send({ err: 'Failed to add guitar' })
  }
}

async function updateGuitar(req, res) {
  try {
    console.log('hey!!!!!')
    const guitar = req.body
    const updatedGuitar = await guitarService.update(guitar)
    res.json(updatedGuitar)
  } catch (err) {
    logger.error('Failed to update guitar', err)
    res.status(500).send({ err: 'Failed to update guitar' })
  }
}

async function removeGuitar(req, res) {
  try {
    const guitarId = req.params.id
    await guitarService.remove(guitarId)
    res.send()
  } catch (err) {
    logger.error('Failed to remove guitar', err)
    res.status(500).send({ err: 'Failed to remove guitar' })
  }
}

async function addGuitarMsg(req, res) {
  const { loggedinUser } = req
  try {
    const guitarId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser,
    }
    const savedMsg = await guitarService.addGuitarMsg(guitarId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update guitar', err)
    res.status(500).send({ err: 'Failed to update guitar' })
  }
}

async function removeGuitarMsg(req, res) {
  const { loggedinUser } = req
  try {
    const guitarId = req.params.id
    const { msgId } = req.params

    const removedId = await guitarService.removeGuitarMsg(guitarId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove guitar msg', err)
    res.status(500).send({ err: 'Failed to remove guitar msg' })
  }
}

module.exports = {
  getGuitars,
  getGuitarById,
  addGuitar,
  updateGuitar,
  removeGuitar,
  addGuitarMsg,
  removeGuitarMsg,
}
