const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const { ObjectId } = require('mongodb')

async function query(filterBy) {
  try {
    const criteria = {
      name: { $regex: filterBy.name, $options: 'i' },
      inStock: JSON.parse(filterBy.inStock),
      // sortBy:filterBy
    }
    const collection = await dbService.getCollection('guitar')
    let guitars
    if (filterBy.sortBy === 'all') {
      guitars = await collection.find(criteria).toArray()
    } else {
      guitars = await collection
        .find(criteria)
        .sort({ [filterBy.sortBy]: 1 })
        .toArray()
    }
    return guitars
  } catch (err) {
    logger.error('cannot find guitars', err)
    throw err
  }
}

async function getById(guitarId) {
  try {
    const collection = await dbService.getCollection('guitar')
    const guitar = collection.findOne({ _id: new ObjectId(guitarId) })
    return guitar
  } catch (err) {
    logger.error(`while finding guitar ${guitarId}`, err)
    throw err
  }
}

async function remove(guitarId) {
  try {
    const collection = await dbService.getCollection('guitar')
    await collection.deleteOne({ _id: new ObjectId(guitarId) })
  } catch (err) {
    logger.error(`cannot remove guitar ${guitarId}`, err)
    throw err
  }
}

async function add(guitar) {
  try {
    const collection = await dbService.getCollection('guitar')
    await collection.insertOne(guitar)
    return guitar
  } catch (err) {
    logger.error('cannot insert guitar', err)
    throw err
  }
}

async function update(guitar) {
  try {
    const guitarToSave = {
      name: guitar.name,
      price: guitar.price,
      msgs: guitar.msgs || [],
    }
    const collection = await dbService.getCollection('guitar')
    await collection.updateOne({ _id: new ObjectId(guitar._id) }, { $set: guitarToSave })
    return guitar
  } catch (err) {
    logger.error(`cannot update guitar ${guitarId}`, err)
    throw err
  }
}

async function addGuitarMsg(guitarId, msg) {
  try {
    msg.id = utilService.makeId()
    const collection = await dbService.getCollection('guitar')
    await collection.updateOne({ _id: ObjectId(guitarId) }, { $push: { msgs: msg } })
    return msg
  } catch (err) {
    logger.error(`cannot add guitar msg ${guitarId}`, err)
    throw err
  }
}

async function removeGuitarMsg(guitarId, msgId) {
  try {
    const collection = await dbService.getCollection('guitar')
    await collection.updateOne({ _id: new ObjectId(guitarId) }, { $pull: { msgs: { id: msgId } } })
    return msgId
  } catch (err) {
    logger.error(`cannot add guitar msg ${guitarId}`, err)
    throw err
  }
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  addGuitarMsg,
  removeGuitarMsg,
}
