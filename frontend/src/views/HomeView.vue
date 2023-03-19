<template>
  <section v-if="loggedInUser" class="username-greetings-container">
    <h1>Hey {{ loggedInUser.fullname }}!</h1>
    <button @click="logout">Logout</button>
  </section>
  <LoginSignUp />
</template>

<script>
import Welcome from '../components/Welcome.vue'
import LoginSignUp from '../components/LoginSignUp.vue'
export default {
  name: 'HomeView',
  components: {
    Welcome,
    LoginSignUp,
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: 'logoutUser' })
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser
    },
  },
}
</script>
