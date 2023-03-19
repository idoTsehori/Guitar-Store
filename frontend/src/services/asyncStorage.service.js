import { utilService } from './util-service.js'

export const storageService = {
  query,
  getById,
  put,
  post,
  remove,
  getLabels,
}

function query(key, filter) {
  var toys = utilService.loadFromStorage(key)
  if (!toys || !toys.length) toys = _createToys(key)
  if (!filter) return Promise.resolve(toys)
  return _filterToys(toys, filter)
}

function getById(key, toyId) {
  const toys = utilService.loadFromStorage(key)
  const toy = toys.find((toy) => toy._id === toyId)
  return Promise.resolve(toy)
}

function put(key, toyToSave) {
  const toys = utilService.loadFromStorage(key)
  const idx = toys.findIndex((toy) => toy._id === toyToSave._id)
  toys.splice(idx, 1, toyToSave)
  utilService.saveToStorage(key, toys)
  return Promise.resolve(toyToSave)
}

function post(key, toyToSave) {
  toyToSave._id = utilService.makeId()
  toyToSave.createdAt = Date.now()

  const toys = utilService.loadFromStorage(key)
  toys.unshift(toyToSave)
  utilService.saveToStorage(key, toys)
  return Promise.resolve(toyToSave)
}

function remove(key, toyId) {
  const toys = utilService.loadFromStorage(key)

  const idx = toys.findIndex((toy) => toy._id === toyId)
  if (idx === -1) return Promise.reject('no such toy')

  toys.splice(idx, 1)
  utilService.saveToStorage(key, toys)
  return Promise.resolve('removed')
}

function getLabels() {
  return Promise.resolve(['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'])
}

function _filterToys(toyToFilter, filter) {
  var toys = [...toyToFilter]
  const { filterBy, sortBy } = filter
  if (filterBy.name) {
    const regex = new RegExp(filterBy.name, 'i')
    toys = toys.filter((toy) => regex.test(toy.name))
  }
  if (filterBy.inStock) {
    toys = toys.filter((toy) => toy.inStock === filterBy.inStock)
  }

  // if (filterBy.labels.length) {
  //   toys = toys.filter((toy) => {
  //     return filterBy.labels.every((label) => toy.labels.includes(label))
  //   })
  // }
  console.log('sortByz', sortBy)
  if (sortBy.by === 'name') toys = toys.sort((a, b) => a.name.localeCompare(b.name) * sortBy.diff)
  if (sortBy.by === 'price') toys = toys.sort((a, b) => (a.price - b.price) * sortBy.diff)
  if (sortBy.by === 'created') toys = toys.sort((a, b) => (a.createAt - b.createAt) * sortBy.diff)

  return Promise.resolve(toys)
}

function _createToys(key) {
  const toys = []
  for (let i = 0; i < 10; i++) {
    const toy = {
      _id: utilService.makeId(),
      name: utilService.makeId(8),
      price: utilService.getRandomInt(10, 100),
      labels: [labels[utilService.getRandomInt(0, 6)], labels[utilService.getRandomInt(0, 6)]],
      createAt: Date.now(),
      inStock: true,
    }
    toys.push(toy)
  }
  utilService.saveToStorage(key, toys)
  return toys
}
