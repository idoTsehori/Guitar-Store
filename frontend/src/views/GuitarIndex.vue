<template>
  <GuitarFilter @filter="setFilter" />

  <GuitarList :guitars="guitars" @removeGuitar="removeGuitar" @addGuitar="addGuitar" />
</template>

<script>
import GuitarList from '../components/GuitarList.vue'
import GuitarFilter from '../components/GuitarFilter.vue'
// import { showMsg } from '../services/event-bus.service.js'

export default {
  name: 'GuitarIndex',
  components: {
    GuitarList,
    GuitarFilter,
  },

  methods: {
    addGuitar(txt) {
      this.$store.dispatch({ type: 'addGuitar', txt })
    },

    removeGuitar(guitarId) {
      this.$store.dispatch({ type: 'removeGuitar', guitarId }).then(() => {
        // showMsg('toy removed')
      })
    },
    setFilter(filter) {
      this.$store.dispatch({ type: 'loadGuitars', filter })
    },
  },

  computed: {
    guitars() {
      return this.$store.getters.getAllGuitars
    },
    msg() {
      return this.$store.getters.getMsg
    },
  },
}
</script>

<style></style>
