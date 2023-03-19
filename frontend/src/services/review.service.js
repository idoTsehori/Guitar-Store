import { httpService } from '../services/http.service.js'
import { storageService } from './asyncStorage.service.js'
import { userService } from '../services/user.service.js'
import { guitarService } from '../services/guitar.service.js'

import { store } from '../store/index.js'
// import {
//   socketService,
//   SOCKET_EVENT_REVIEW_ADDED,
//   SOCKET_EVENT_REVIEW_ABOUT_YOU,
// } from './socket.service'
// ;(() => {
//   setTimeout(() => {
//     socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
//       console.log('GOT from socket', review)
//       store.commit({ type: 'addReview', review })
//     })
//     socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
//       showSuccessMsg(`New review about me ${review.txt}`)
//     })
//   }, 0)
// })()

export const reviewService = {
  add,
  query,
  remove,
}

function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.delete('review', reviewId)
}

async function add({ txt, aboutGuitarId }) {
  // const aboutGuitar = await guitarService.getById(aboutGuitarId)

  // const reviewToAdd = {
  //   txt,
  //   byUser: userService.getLoggedinUser(),
  //   aboutGuitar: {
  //     _id: aboutGuitar._id,
  //     name: aboutGuitar.name,
  //     imgUrl: aboutGuitar.img,
  //   },
  // }

  // reviewToAdd.byUser.score += 10
  // await userService.update(reviewToAdd.byUser)
  // const addedReview = await storageService.post('review', reviewToAdd)
  const addedReview = await httpService.post(`review`, { txt, aboutGuitarId })
  return addedReview
}
