import { guitarService } from '../../services/guitar.service.js'
import { utilService } from '../../services/util-service.js'

export const guitarStore = {
  state() {
    return {
      guitars: [],
      filterBy: null,
    }
  },

  mutations: {
    setGuitars(state, { guitars }) {
      state.guitars = guitars
    },
    addGuitar(state, { savedGuitar }) {
      state.guitars.unshift(savedGuitar)
    },
    removeGuitar(state, { guitarId }) {
      const idx = state.guitars.findIndex((guitar) => guitar._id === guitarId)
      state.guitars.splice(idx, 1)
    },
    saveGuitar(state, { savedGuitar }) {
      let guitar = state.guitars.find((guitar) => guitar._id === savedGuitar._id)
      if (guitar) {
        // update a guitar
        guitar.name = savedGuitar.name
        guitar.price = savedGuitar.price
      } else {
        // save a new guitar
        state.guitars.push(savedGuitar)
      }
    },
  },
  getters: {
    getAllGuitars({ guitars }) {
      return guitars
    },
  },
  actions: {
    loadGuitars({ commit }, { filter }) {
      return guitarService.query(filter).then((guitars) => {
        commit({ type: 'setGuitars', guitars })
        return guitars
      })
    },

    addGuitar({ commit }, { txt }) {
      const newGuitar = guitarService.getEmptyGuitar()
      newGuitar.name = txt
      guitarService.save(newGuitar).then((savedGuitar) => {
        commit({ type: 'addGuitar', savedGuitar })
      })
    },

    removeGuitar({ commit }, { guitarId }) {
      return guitarService.remove(guitarId).then(() => {
        commit({ type: 'removeGuitar', guitarId })
      })
    },

    getSelectedGuitar({ commit }, { guitarId }) {
      return guitarService.getById(guitarId)
    },

    saveGuitar({ commit }, { guitar }) {
      guitarService.save(guitar).then((savedGuitar) => {
        commit({ type: 'saveGuitar', savedGuitar })
      })
    },

    async saveUserMsg({ commit }, { msg, guitarId }) {
      const guitar = await guitarService.getById(guitarId)
      msg.id = utilService.makeId()
      if (!guitar.msgs) guitar.msgs = []
      guitar.msgs.push(msg)
      const savedGuitar = await guitarService.save(guitar).then(this.$router.push('/guitar'))
    },
  },
}
