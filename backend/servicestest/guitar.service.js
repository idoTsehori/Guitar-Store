const fs = require('fs')
const guitars = require('../data/guitar.json')

module.exports = {
  query,
  getById,
  save,
  remove,
}

function query(filterBy) {
  //   if (!filterBy) {
  //     return Promise.resolve(guitars)
  //   }
  const filteredguitars = _filterGuitars(guitars, filterBy)
  return Promise.resolve(filteredguitars)
}

function getById(guitarId) {
  return new Promise((resolve, reject) => {
    if (!guitarId) reject('No guitar Id')

    const guitar = guitars.find((guitar) => guitar._id === guitarId)
    if (!guitar) reject('guitar not found')
    resolve(guitar)
  })
}

function remove(guitarId) {
  if (!guitarId) return Promise.reject('No guitar Id')

  const idx = guitars.findIndex((guitar) => guitar._id === guitarId)
  if (idx === -1) return Promise.reject('guitar not found')
  guitars.splice(idx, 1)
  return _saveGuitarsToFile()
}

function save(newGuitar) {
  if (newGuitar._id) {
    const idx = guitars.findIndex((guitar) => guitar._id === newGuitar._id)
    if (idx === -1) return Promise.reject('guitar not found')
    guitars.splice(idx, 1, newGuitar)
  } else {
    newGuitar._id = _makeId()
    newGuitar.createdAt = Date.now()
    guitars.unshift(newGuitar)
  }
  return _saveGuitarsToFile().then(() => newGuitar)
}

function _filterGuitars(guitars, filter) {
  var filterGuitars = JSON.parse(JSON.stringify(guitars))
  const { name, inStock, sortBy } = filter
  if (name) {
    const regex = new RegExp(name, 'i')
    filterGuitars = filterGuitars.filter((guitar) => regex.test(guitar.name))
  }
  if (inStock) {
    filterGuitars = filterGuitars.filter((guitar) => guitar.inStock === inStock)
  }

  // if (filterBy.labels.length) {
  //   filterguitars = filterguitars.filter((guitar) => {
  //     return filterBy.labels.every((label) => guitar.labels.includes(label))
  //   })
  // }
  if (sortBy === 'name') filterGuitars = filterGuitars.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy === 'price') filterGuitars = filterGuitars.sort((a, b) => a.price - b.price)
  if (sortBy === 'created') filterGuitars = filterGuitars.sort((a, b) => a.createAt - b.createAt)

  return filterGuitars
}

function _makeId(length = 5) {
  let txt = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function _saveGuitarsToFile() {
  return new Promise((resolve, reject) => {
    const content = JSON.stringify(guitars, null, 2)
    fs.writeFile('./data/guitar.json', content, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}
