<template>
  <section class="login-signup-container">
    <form class="box" @submit.prevent="login">
      <h2>Login</h2>
      <input type="text" v-model="credentials.username" placeholder="Username" />
      <input type="password" v-model="credentials.password" placeholder="Password" />
      <button>Login</button>
    </form>
    <Welcome />
    <form class="box" @submit.prevent="signup">
      <h2>Signup</h2>
      <input type="text" v-model="signupInfo.fullname" placeholder="Full name" />
      <input type="text" v-model="signupInfo.username" placeholder="Username" />
      <input type="password" v-model="signupInfo.password" placeholder="Password" />
      <button>Signup</button>
    </form>
  </section>
</template>

<script>
import Welcome from '../components/Welcome.vue'
// import { guitarService } from '../services/guitar.service.js'
export default {
  name: 'LoginSignUp',

  data() {
    return {
      credentials: {
        username: 'puki',
        password: '1234',
      },
      signupInfo: {
        fullname: '',
        username: '',
        password: '',
      },
    }
  },

  methods: {
    login() {
      userService
        .login(this.credentials)
        .then((user) => {
          this.$store.commit('onChangeLoginStatus', { user })
        })
        .catch((err) => {
          console.log('Cannot login', err)
          showErrorMsg(`Cannot login`)
        })
    },
    signup() {
      userService
        .signup(this.signupInfo)
        .then((user) => {
          this.$emit('onChangeLoginStatus')
        })
        .catch((err) => {
          console.log('Cannot signup', err)
          // showErrorMsg(`Cannot signup`)
        })
    },
  },
  components: {
    Welcome,
  },
}
</script>

<style></style>
