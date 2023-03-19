<template>
  <section class="guitar-details" v-if="selectedGuitar">
    <h1>Name: {{ selectedGuitar.name }}</h1>
    <img :src="selectedGuitar.img" />
    <h2>Price: {{ selectedGuitar.price }}$</h2>
    <h2>
      Labels: <span v-for="label in selectedGuitar.labels">{{ label }}, </span>
    </h2>
    <h3>{{ selectedGuitar.inStock ? 'in stock ✔' : 'out of stock ✖' }}</h3>
    <h3>{{ formatTime }}</h3>
    <ul class="user-msgs-container" v-if="selectedGuitar.msgs">
      <h3>Messages:</h3>
      <li v-for="msg in selectedGuitar.msgs">
        <p>By: {{ msg.by.fullname }}</p>
        <p>text:{{ msg.txt }}</p>
      </li>
    </ul>
    <button>
      <RouterLink :to="'/guitar/' + selectedGuitar._id + '/msg'">Add Message</RouterLink>
    </button>
    <button @click="this.$router.push('/guitar')">Back</button>

    <form @submit.prevent="addReview" class="review">
      <textarea v-model="review.txt" cols="20" rows="5"></textarea>
      <button>Add Review</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'GuitarDetails',

  data() {
    return {
      selectedGuitar: null,
      review: {
        txt: '',
      },
    }
  },
  created() {
    const { guitarId } = this.$route.params
    this.$store.dispatch({ type: 'getSelectedGuitar', guitarId }).then((guitar) => {
      this.selectedGuitar = guitar
      this.review.aboutGuitarId = guitar._id
    })
  },
  methods: {
    addReview() {
      this.$store.dispatch({ type: 'addReview', review: this.review })
    },
  },

  computed: {
    formatTime() {
      let dateFormat = new Date(this.selectedGuitar.createdAt)
      return (
        dateFormat.getDate() +
        '/' +
        (dateFormat.getMonth() + 1) +
        '/' +
        dateFormat.getFullYear() +
        ' ' +
        dateFormat.getHours() +
        ':' +
        dateFormat.getMinutes() +
        ':' +
        dateFormat.getSeconds()
      )
    },
  },
}
</script>

<style></style>
