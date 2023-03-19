<template>
  <section class="user-msg-container">
    <h1>Write a message</h1>
    <form @submit.prevent="saveMsg">
      <textarea v-model="msg.txt" cols="40" rows="10" placeholder="Write something"></textarea>
      <button>Submit</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      msg: { id: null, txt: '', by: null },
    }
  },
  created() {
    this.msg.by = this.$store.getters.getLoggedInUser
  },
  methods: {
    saveMsg() {
      const { guitarId } = this.$route.params
      this.$store.dispatch({ type: 'saveUserMsg', msg: this.msg, guitarId })
    },
  },
  computed: {},
}
</script>

<style></style>
