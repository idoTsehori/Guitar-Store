import { storageService } from './asyncStorage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util-service.js'

export const guitarService = {
  query,
  getById,
  save,
  remove,
  getEmptyGuitar,
}

// console.log('Guitar service is up')
const KEY = 'guitar_DB'
// _createguitars()

const API = 'guitar/'

function query(filter) {
  // console.log('filter in service', { ...filter })
  return httpService.get(API, filter)
}

function getById(guitarId) {
  return httpService.get(API + guitarId)
}

function save(guitarToSave) {
  if (guitarToSave._id) return httpService.put(API + guitarToSave._id, guitarToSave)
  else return httpService.post(API, guitarToSave)
}

function remove(guitarId) {
  return httpService.delete(API + guitarId)
}

function getEmptyGuitar() {
  return {
    // _id: '',
    name: '',
    price: null,
    labels: [],
    img: 'imgs/no_pic_symbol.jpg',
    // createdAt: new Date(Date.now()).toLocaleString(),
    createdAt: '',
    inStock: true,
  }
}

function _createGuitars() {
  var guitars = JSON.parse(localStorage.getItem(KEY))
  if (!guitars || !guitars.length) {
    guitars = [
      _createguitar(
        'Talking Doll',
        123,
        ['Doll', 'Battery Powered', 'Baby'],
        ['Good', 'Nice', 'Fun'],
        true
      ),
      _createguitar('Ball', 50, ['Outdoor', 'Baby'], ['Amazing!'], false),
      _createguitar('Cards', 250, ['Box game'], ['wow!', 'awesome'], true),
    ]
    localStorage.setItem(KEY, JSON.stringify(guitars))
  }
}

function _createGuitar(name, price, labels, reviews, inStock = true) {
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels,
    inStock,
    createdAt: new Date(Date.now()).toLocaleString(),
    reviews: reviews,
  }
}
