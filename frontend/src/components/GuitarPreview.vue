<template>
  <h1>{{ guitar.name }}</h1>
  <h2>Price: {{ guitar.price }}$</h2>
  <img class="guitar-img" :src="guitar.img" />
  <button
    v-if="loggedInUser?.isAdmin"
    class="delete-guitar"
    @click.stop="$emit('removeGuitar', guitar._id)">
    X
  </button>
</template>

<script>
export default {
  name: 'guitarPreview',
  props: {
    guitar: {
      type: Object,
      required: true,
    },
  },

  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser
    },
  },

  emits: ['removeGuitar'],
}
</script>

<style></style>
