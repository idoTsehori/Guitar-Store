import { createStore } from 'vuex'

import { userStore } from '../store/modules/user.store.js'
import { guitarStore } from '../store/modules/guitar.store.js'
import { reviewStore } from '../store/modules/review.store.js'

export const store = createStore({
  strict: true,
  state: {
    msg: 'Store Is Running',
  },
  getters: {
    getMsg(state) {
      return state.msg
    },
  },
  modules: {
    guitarStore,
    userStore,
    reviewStore,
  },
})
