<template>
  <!-- <form class="add-guitar" @submit.prevent="$emit('addGuitar', userTxt)">
    <h4>Add Guitar:</h4>
    <input v-model="userTxt" type="text" placeholder="add guitar" />
    <button type="submit">Add guitar</button>
  </form> -->
  <section class="add-guitar-container">
    <el-button class="add-btn" type="danger" round>
      <RouterLink to="/guitar/edit">Add a new Guitar 🤘🏼</RouterLink>
    </el-button>
  </section>

  <ul class="guitar-list">
    <li class="guitar" v-for="guitar in guitars">
      <GuitarPreview @removeGuitar="$emit('removeGuitar', guitar._id)" :guitar="guitar" />
      <section class="action-btns">
        <!-- <button class="delete-guitar" @click.stop="$emit('removeGuitar', guitar._id)">
          Delete
        </button> -->
        <button @click="showGuitarDetails(guitar)" :key="guitar._id">Details</button>
        <button v-if="loggedInUser?.isAdmin" @click="showGuitarEdit(guitar)">Edit</button>
      </section>
    </li>
  </ul>
</template>

<script>
import GuitarPreview from '../components/GuitarPreview.vue'
export default {
  name: 'GuitarList',
  props: {
    guitars: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      userTxt: '',
      // loggedInUser: null,
    }
  },
  components: {
    GuitarPreview,
  },
  created() {
    // this.loggedInUser = this.$store.getters.getLoggedInUser
    // console.log('this.loggedInUser:', this.loggedInUser)
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser
    },
  },
  methods: {
    showGuitarDetails(guitar) {
      this.$router.push('/guitar/' + guitar._id)
    },
    showGuitarEdit(guitar) {
      this.$router.push('/guitar/edit/' + guitar._id)
    },
  },
  emits: ['removeGuitar', 'addGuitar'],
}
</script>

<style></style>
