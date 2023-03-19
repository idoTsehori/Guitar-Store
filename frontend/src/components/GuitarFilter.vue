<template>
  <section class="filter-container">
    <h5>Filter By:</h5>

    <label>
      Name:
      <input
        @input="$emit('filter', filter)"
        v-model="filter.filterBy.name"
        type="text"
        placeholder="Search a guitar brand" />
    </label>

    <!-- <label>
      In stock:
      <input type="checkbox" @change="$emit('filter', filter)" v-model="filter.filterBy.inStock" />
    </label> -->
    <el-checkbox
      @change="$emit('filter', filter)"
      v-model="filter.filterBy.inStock"
      checked
      label="In stock" />
    <!-- <label>
      Labels:
      <select>
        <option value="">1</option>
        <option value="">2</option>
      </select>
    </label> -->

    <!-- <label>
      Sort By:
      <select @change="$emit('filter', filter)" v-model="filter.sortBy.by">
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="created">Created</option>
      </select> -->
    <label
      >Sort By:

      <el-select
        @change="$emit('filter', filter)"
        v-model="filter.sortBy.by"
        class="m-2"
        placeholder="Select"
        size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </label>
  </section>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GuitarFilter',
  data() {
    return {
      value: ref(''),
      input: ref(''),
      options: [
        {
          value: 'all',
          label: 'All',
        },
        {
          value: 'name',
          label: 'Name',
        },
        {
          value: 'price',
          label: 'Price',
        },
        {
          value: 'created',
          label: 'Created',
        },
      ],

      filter: {
        filterBy: {
          name: '',
          inStock: true,
        },
        sortBy: {
          by: 'all',
          diff: 1,
        },
      },
    }
  },
}
</script>

<style></style>
