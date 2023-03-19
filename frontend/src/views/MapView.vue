<template>Map</template>

<script>
export default {
  name: 'Map',
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {
    getAllToys() {
      return this.$store.getters.getAllToys
    },
  },
}
</script>
