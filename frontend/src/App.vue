<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

<script>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  created() {
    this.$store.dispatch({ type: 'loadGuitars' })
  },
}
</script>

<style></style>
