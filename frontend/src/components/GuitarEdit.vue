<template>
  <section v-if="selectedGuitar" class="guitar-edit">
    <form @submit.prevent="saveGuitar">
      <h1>{{ selectedGuitar._id ? 'Update guitar' : 'Add a new guitar' }}</h1>
      <label
        >Name:
        <input v-model="userTxt" type="text" :placeholder="selectedGuitar.name" />
      </label>
      <label
        >Price:
        <input v-model="userPrice" type="number" :placeholder="selectedGuitar.price" />
      </label>

      <label>
        In Stock:
        <input :checked="selectedGuitar.inStock" v-model="inStock" type="checkbox" />
      </label>

      <label
        >Pick Labels:
        <div class="m-4">
          <el-select v-model="labelsVal" multiple placeholder="Select" style="width: 240px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
      </label>

      <button>Save</button>
      <RouterLink to="/guitar">back</RouterLink>
    </form>
  </section>
</template>
<script>
import { guitarService } from '../services/guitar.service.js'
import { ref } from 'vue'
export default {
  name: 'GuitarEdit',

  data() {
    return {
      userTxt: '',
      userPrice: null,
      inStock: false,
      labelsVal: ref([]),
      selectedGuitar: null,
      options: [
        {
          value: 'electric',
          label: 'electric',
        },
        {
          value: 'rock',
          label: 'rock',
        },
        {
          value: 'blues',
          label: 'blues',
        },
        {
          value: 'jazz',
          label: 'jazz',
        },
        {
          value: 'metal',
          label: 'metal',
        },
        {
          value: 'folk',
          label: 'folk',
        },
        {
          value: 'classical',
          label: 'classical',
        },
        {
          value: 'country',
          label: 'country',
        },
      ],
    }
  },
  created() {
    const { guitarId } = this.$route.params
    if (guitarId) {
      this.$store.dispatch({ type: 'getSelectedGuitar', guitarId }).then((guitar) => {
        this.selectedGuitar = guitar
      })
    } else {
      this.selectedGuitar = guitarService.getEmptyGuitar()
    }
  },

  methods: {
    saveGuitar() {
      const guitar = this.selectedGuitar
      guitar.name = this.userTxt
      guitar.price = this.userPrice
      guitar.inStock = this.inStock
      guitar.labels = this.labelsVal
      guitar.createdAt = Date.now()

      console.log('guitar', guitar)
      this.$store.dispatch({ type: 'saveGuitar', guitar }).then(() => {
        this.$router.push('/guitar')
      })
    },
  },
  components: {
    guitarService,
  },
}
</script>

<style></style>
